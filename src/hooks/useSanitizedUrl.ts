import { URL_SCHEME, URL_SCHEME_INSECURE } from "../data/constants";

export default function useSanitizedUrl() {
  return (url: string) => {
    const cleanedUrl = url.trim();

    if (
      cleanedUrl.startsWith(URL_SCHEME) ||
      cleanedUrl.startsWith(URL_SCHEME_INSECURE)
    ) {
      return cleanedUrl;
    }

    return URL_SCHEME + cleanedUrl;
  };
}
