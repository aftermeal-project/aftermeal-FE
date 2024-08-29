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


// May contain unused imports in some cases
// @ts-ignore
import type { ActivityScheduleResponseDtoParticipantsInner } from './activity-schedule-response-dto-participants-inner';

/**
 * 
 * @export
 * @interface ActivityScheduleResponseDto
 */
export interface ActivityScheduleResponseDto {
    /**
     * 
     * @type {number}
     * @memberof ActivityScheduleResponseDto
     */
    'activityScheduleId'?: number;
    /**
     * 
     * @type {string}
     * @memberof ActivityScheduleResponseDto
     */
    'name'?: string;
    /**
     * 
     * @type {number}
     * @memberof ActivityScheduleResponseDto
     */
    'maxParticipants'?: number;
    /**
     * 
     * @type {string}
     * @memberof ActivityScheduleResponseDto
     */
    'status'?: ActivityScheduleResponseDtoStatus;
    /**
     * 
     * @type {string}
     * @memberof ActivityScheduleResponseDto
     */
    'type'?: ActivityScheduleResponseDtoType;
    /**
     * 
     * @type {string}
     * @memberof ActivityScheduleResponseDto
     */
    'scheduledDate'?: string;
    /**
     * 
     * @type {Array<ActivityScheduleResponseDtoParticipantsInner>}
     * @memberof ActivityScheduleResponseDto
     */
    'participants'?: Array<ActivityScheduleResponseDtoParticipantsInner>;
}

export const ActivityScheduleResponseDtoStatus = {
    Scheduled: 'SCHEDULED',
    InProgress: 'IN_PROGRESS',
    Canceled: 'CANCELED',
    Completed: 'COMPLETED'
} as const;

export type ActivityScheduleResponseDtoStatus = typeof ActivityScheduleResponseDtoStatus[keyof typeof ActivityScheduleResponseDtoStatus];
export const ActivityScheduleResponseDtoType = {
    Lunch: 'LUNCH',
    Dinner: 'DINNER'
} as const;

export type ActivityScheduleResponseDtoType = typeof ActivityScheduleResponseDtoType[keyof typeof ActivityScheduleResponseDtoType];


