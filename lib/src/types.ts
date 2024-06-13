export type MaybeNumber = number | null | undefined;

export type RawData = Record<string, unknown>;

export type InputFieldType = number | string;
export type InputFields<T> = {
	[K in keyof T as T[K] extends InputFieldType
		? K
		: never]: T[K] extends InputFieldType ? T[K] : never;
};

export type NumericalFields<T> = {
	[K in keyof T as T[K] extends MaybeNumber ? K : never]: T[K];
};
