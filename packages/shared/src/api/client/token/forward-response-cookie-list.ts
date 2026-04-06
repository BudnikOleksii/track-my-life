import { EMPTY_LIST_LENGTH, NOT_FOUND_INDEX } from '../../../constants/list';

export interface ParsedCookie {
  name: string;
  value: string;
  options: {
    httpOnly?: boolean | undefined;
    secure?: boolean | undefined;
    sameSite?: 'lax' | 'strict' | 'none' | undefined;
    path?: string | undefined;
    domain?: string | undefined;
    maxAge?: number | undefined;
    expires?: Date | undefined;
  };
}

const SEPARATOR_OFFSET = 1;

// oxlint-disable-next-line max-statements
const parseAttributeList = (attributeList: string[]): ParsedCookie['options'] => {
  const options: ParsedCookie['options'] = {};

  for (const attribute of attributeList) {
    const [key, ...valueParts] = attribute.split('=');
    const attributeValue = valueParts.join('=');

    switch (key?.toLowerCase()) {
      case 'httponly': {
        options.httpOnly = true;
        break;
      }
      case 'secure': {
        options.secure = true;
        break;
      }
      case 'samesite': {
        options.sameSite = attributeValue.toLowerCase() as ParsedCookie['options']['sameSite'];
        break;
      }
      case 'path': {
        options.path = attributeValue;
        break;
      }
      case 'domain': {
        options.domain = attributeValue;
        break;
      }
      case 'max-age': {
        options.maxAge = Number(attributeValue);
        break;
      }
      case 'expires': {
        options.expires = new Date(attributeValue);
        break;
      }
    }
  }

  return options;
};

export const parseCookieString = (setCookieString: string): ParsedCookie | null => {
  const [nameValuePart, ...attributeList] = setCookieString.split('; ');

  if (!nameValuePart) {
    return null;
  }

  const separatorIndex = nameValuePart.indexOf('=');

  if (separatorIndex === NOT_FOUND_INDEX) {
    return null;
  }

  const name = nameValuePart.slice(EMPTY_LIST_LENGTH, separatorIndex);
  const value = nameValuePart.slice(separatorIndex + SEPARATOR_OFFSET);

  return { name, value, options: parseAttributeList(attributeList) };
};

export const forwardResponseCookieList = async (response: Response): Promise<void> => {
  const setCookieList = response.headers.getSetCookie();

  if (setCookieList.length === EMPTY_LIST_LENGTH) {
    return;
  }

  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();

  for (const setCookieString of setCookieList) {
    const parsed = parseCookieString(setCookieString);

    if (parsed) {
      cookieStore.set(parsed.name, parsed.value, { ...parsed.options, path: '/' });
    }
  }
};
