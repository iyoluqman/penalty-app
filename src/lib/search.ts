export function getFormDataAndQuery(
  e: React.FormEvent<HTMLFormElement>,
  pathname: string
) {
  const formData = new FormData(e.target as HTMLFormElement);
  const form = Object.fromEntries(
    formData.entries() as Iterable<[PropertyKey, string]>
  );
  const query = new URL(pathname, window.location.origin);
  return { form, query };
}

export function appendQueryParams(url: URL, searchParams: SearchParams) {
  // ↓↓ This is to stop empty searchParams from appearing in the URL
  for (const key of Object.keys(searchParams)) {
    if (
      !!searchParams[key] &&
      (typeof searchParams[key] === "string" ||
        typeof searchParams[key] === "number")
    ) {
      url.searchParams.set(key, searchParams[key]?.toString() ?? "");
    }
  }
  return url;
}
