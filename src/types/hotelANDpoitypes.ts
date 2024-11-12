export type POI = {
  entityName: string;
  entityId: string;
  class: string;
};

export type Hotel = {
  entityName: string;
  entityId: string;
  class: string;
  hierarchy: string;
};

export type APIResponse = {
  data: {
      pois: POI[] | null;
      class: string;
      entityName: string;
      entityId: string;
      hierarchy: string;
  }[];
};
