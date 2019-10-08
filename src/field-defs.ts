import { Fields } from './fields'
import { Form } from './form'

export type ValidateSignle<V, T, R> = (value: V | undefined, fields: Fields<T>) => R | false | undefined
export type ValidateFn<V, T, R> = ValidateSignle<V, T, R> | ValidateSignle<V, T, R>[]
export type ChangedFn<V, T> = (newValue: V | undefined, form: Form<T>) => void

export interface FieldDef<TValue, TFields, TValidationResult> {
  /**
   * Validates specific field.
   * @returns Error or success: `undefined | false`.
   * @example
   * name => name === 'Adelina' || 'wrong-name'
   * @example
   * age => (age < 18 && 'too-young') || (age > 75 && 'too-old')
   */
  validate?: ValidateFn<TValue, TFields, TValidationResult>

  /**
   * Same as `validate` but does not block form submission
   */
  warn?: ValidateFn<TValue, TFields, TValidationResult>

  /**
   * Calls after value changed
   */
  changed?: ChangedFn<TValue, TFields>

  /**
   * Dependent fields that must be validated after this field
   */
  dependent?: ReadonlyArray<Extract<keyof TFields, string>> | (Extract<keyof TFields, string>)

  /**
   * Overrides default form behaviour for specific field
   */
  validateOnChange?: boolean

  /**
   * Overrides default form behaviour for specific field
   */
  validateOnBlur?: boolean
}

export type FieldDefs<T, TValidationResult> = {
  [P in keyof T]-?: FieldDef<T[P], T, TValidationResult>
}
