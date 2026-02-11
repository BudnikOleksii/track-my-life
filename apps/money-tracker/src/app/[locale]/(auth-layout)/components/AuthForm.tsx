import type { FC } from 'react';

import { Button } from '@track-my-life/ui/components/button';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from '@track-my-life/ui/components/field';
import { Input } from '@track-my-life/ui/components/input';
import { getTranslations } from 'next-intl/server';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

interface Props {
  action: (formData: FormData) => Promise<void>;
  errorList?: ({ message?: string } | undefined)[];
  submitText: string;
}

export const AuthForm: FC<Props> = async ({ action, errorList, submitText }) => {
  const tAuthShared = await getTranslations(I18N_NAMESPACE.authShared);

  return (
    <form action={action} className="space-y-4">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">
              <FieldTitle>{tAuthShared('email')}</FieldTitle>
            </FieldLabel>
            <FieldContent>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder={tAuthShared('emailPlaceholder')}
              />
            </FieldContent>
            <FieldDescription>{tAuthShared('emailPlaceholder')}</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="password">
              <FieldTitle>{tAuthShared('password')}</FieldTitle>
            </FieldLabel>
            <FieldContent>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                minLength={8}
                placeholder={tAuthShared('passwordPlaceholder')}
              />
            </FieldContent>
            <FieldDescription>{tAuthShared('passwordPlaceholder')}</FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>
      <FieldError errors={errorList} />

      <Button type="submit" className="w-full">
        {submitText}
      </Button>
    </form>
  );
};
