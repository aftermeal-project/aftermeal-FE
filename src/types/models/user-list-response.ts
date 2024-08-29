/* tslint:disable */
/* eslint-disable */
/**
 * Aftermeal API Docs
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * 
 * @export
 * @interface UserListResponse
 */
export interface UserListResponse {
    /**
     * 
     * @type {number}
     * @memberof UserListResponse
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof UserListResponse
     */
    'name'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserListResponse
     */
    'email'?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof UserListResponse
     */
    'roles'?: Array<UserListResponseRoles>;
    /**
     * 
     * @type {string}
     * @memberof UserListResponse
     */
    'type'?: UserListResponseType;
    /**
     * 
     * @type {string}
     * @memberof UserListResponse
     */
    'status'?: UserListResponseStatus;
    /**
     * 
     * @type {number}
     * @memberof UserListResponse
     */
    'generationNumber'?: number;
}

export const UserListResponseRoles = {
    User: 'USER',
    Admin: 'ADMIN'
} as const;

export type UserListResponseRoles = typeof UserListResponseRoles[keyof typeof UserListResponseRoles];
export const UserListResponseType = {
    Student: 'STUDENT',
    Teacher: 'TEACHER'
} as const;

export type UserListResponseType = typeof UserListResponseType[keyof typeof UserListResponseType];
export const UserListResponseStatus = {
    Activate: 'ACTIVATE',
    Deactivate: 'DEACTIVATE'
} as const;

export type UserListResponseStatus = typeof UserListResponseStatus[keyof typeof UserListResponseStatus];


