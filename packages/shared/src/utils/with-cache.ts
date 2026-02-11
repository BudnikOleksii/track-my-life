export const withCache = <TArgs extends unknown[], TResult>(
	fn: (...args: TArgs) => Promise<TResult>,
): ((...args: TArgs) => Promise<TResult>) => {
	const cache = new Map<string, TResult>();

	return async (...args: TArgs): Promise<TResult> => {
		const key = JSON.stringify(args);
		const cachedResult = cache.get(key);

		if (cachedResult) {
			return cachedResult;
		}

		const result = await fn(...args);
		cache.set(key, result);

		return result;
	};
};
