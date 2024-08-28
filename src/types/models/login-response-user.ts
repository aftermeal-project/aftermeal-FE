/* tslint:disable */
/* eslint-disable */

/**
 *
 * @export
 * @interface LoginResponseUser
 */
export interface LoginResponseUser {
  /**
   *
   * @type {string}
   * @memberof LoginResponseUser
   */
  id?: string;
  /**
   *
   * @type {string}
   * @memberof LoginResponseUser
   */
  name?: string;
  /**
   *
   * @type {Array<string>}
   * @memberof LoginResponseUser
   */
  roles?: Array<LoginResponseUserRoles>;
}

export const LoginResponseUserRoles = {
  User: 'USER',
  Admin: 'ADMIN',
} as const;

export type LoginResponseUserRoles =
  (typeof LoginResponseUserRoles)[keyof typeof LoginResponseUserRoles];
