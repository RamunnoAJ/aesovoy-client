export const mapResponseToDTO = <T, U>(
  responseDTO: U,
  propertyMappings?: Record<string, keyof T>,
  customTransformers?: Partial<Record<keyof T, (value: unknown) => unknown>>,
): T => {
  const mappedDTO: Partial<T> = {};

  for (const key in responseDTO) {
    const mappedKey = propertyMappings?.[key] || (key as unknown as keyof T);
    const rawValue = responseDTO[key];

    if (customTransformers?.[mappedKey]) {
      mappedDTO[mappedKey] = customTransformers[mappedKey]!(
        rawValue,
      ) as T[keyof T];
    } else {
      mappedDTO[mappedKey] = rawValue as unknown as T[keyof T];
    }
  }

  return mappedDTO as T;
};
