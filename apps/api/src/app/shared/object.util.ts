/**
 *
 * @param value some value
 * @returns zu boolean gecasteter wert
 */
export function toBoolean(value: any): boolean {
  return value != null && `${value}` !== 'false';
}

/**
 *
 * @param v empty?
 * @returns boolean
 */
export function isNil(v: any) {
  return v === null || v === undefined;
}

/**
 *
 * @param data object
 * @returns boolean
 */
export function hasDefinedProperties(data: Record<any, any>): boolean {
  return !!Object.values(data).filter((property) => !isNil(property)).length;
}

/**
 *
 * @param value some value
 * @returns either given value or empty value of type
 */
export function objectSpread<T>(value: T): T {
  return value || ({} as T);
}

/**
 *
 * @param array data
 * @returns either data or creates empty array
 */
export function arraySpread<T>(array: T[]): T[] {
  return array || [];
}

/**
 *
 * @param value some value
 * @returns boolean
 */
export function isArray<T>(value: Array<T> | any): value is Array<T> {
  return Array.isArray(value);
}

/**
 *
 * @param value something
 * @returns boolean
 */
export function isFunction<T extends () => any>(value: any): value is T {
  return typeof value === 'function';
}
