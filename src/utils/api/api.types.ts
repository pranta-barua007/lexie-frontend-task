export interface INasaSearchResult {
  data: {
    nasa_id: string;
    title: string;
    location: string;
    photographer: string;
    description_508: string;
    date_created: string;
    keywords: string[];
  }[];
  links: {
    href: string;
  }[];
}

export interface INasaAsset {
  collection: {
    href: string;
    items: INasaImage[];
    version: string;
  };
}

interface INasaImage {
  href: string;
}

export interface ILocation {
  location: string;
}

export interface INasaAlbumCollection {
  collection: {
    href: string;
    items: INasaAlbum[];
    links: {
      href: string;
      prompt: string;
      rel: string;
    }[];
    metadata: {
      total_hits: number;
    };
    version: string;
  };
}

interface INasaAlbum {
  data: {
    nasa_id: string;
    album: string[];
    keywords: string[];
    title: string;
    media_type: string;
    date_created: string;
    center: string;
    description: string;
    href: string;
    links: {
      href: string;
      rel: string;
      render: string;
    }[];
  }[];
}
