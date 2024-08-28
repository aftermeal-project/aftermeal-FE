/* tslint:disable */
/* eslint-disable */

// May contain unused imports in some cases
// @ts-ignore
import type { LoginResponseUser } from './login-response-user';

/**
 *
 * @export
 * @interface LoginResponse
 */
export interface LoginResponse {
  /**
   *
   * @type {string}
   * @memberof LoginResponse
   */
  accessToken?: string;
  /**
   *
   * @type {string}
   * @memberof LoginResponse
   */
  tokenType?: string;
  /**
   *
   * @type {number}
   * @memberof LoginResponse
   */
  expiredIn?: number;
  /**
   *
   * @type {string}
   * @memberof LoginResponse
   */
  refreshToken?: string;
  /**
   *
   * @type {LoginResponseUser}
   * @memberof LoginResponse
   */
  user?: LoginResponseUser;
}
