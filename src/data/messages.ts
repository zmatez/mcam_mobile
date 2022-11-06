export class Messages {
    public static AUTHENTICATION_SUCCESSFUL: number = 0x001;
    public static AUTHENTICATION_FAILED: number = 0x002;
    public static CONNECTION_CHECK: number = 0x003;
    public static CONNECTION_CHECK_RESPONSE: number = 0x004;

    // REQUESTS
    public static REQUEST_CAMERA_LIST: number = 0x010;
    public static REQUEST_STREAM_START: number = 0x011;
    public static REQUEST_STREAM_END: number = 0x012;
    public static REQUEST_CAMERA_INFO: number = 0x013;
    public static REQUEST_CAMERA_TAKE_PICTURE: number = 0x014;
    public static REQUEST_PICTURE: number = 0x015;
    public static REQUEST_PICTURE_LIST: number = 0x016;
    public static REQUEST_SETTINGS_DATA: number = 0x017;
    public static REQUEST_SETTINGS_CHANGE: number = 0x018;
    public static REQUEST_ACCESSOR_ADD: number = 0x019;
    public static REQUEST_ACCESSOR_CHANGE_ADMIN: number = 0x020;
    public static REQUEST_ACCESSOR_REMOVE: number = 0x021;
    public static REQUEST_START_UPDATE: number = 0x022;
    public static REQUEST_CANCEL_UPDATE: number = 0x023;
    public static REQUEST_FINISH_UPDATE: number = 0x024;
    public static REQUEST_RESTART: number = 0x025;
    public static REQUEST_SD_FORMAT: number = 0x026;
    public static REQUEST_RESTORE_FABRIC_SETTINGS: number = 0x027;
    public static REQUEST_LED: number = 0x028;
    public static REQUEST_TEMP_READINGS: number = 0x029;
    public static REQUEST_DEBUG_INFO: number = 0x030;

    // RESPONDS
    public static RESPOND_CAMERA_LIST: number = 0x040;
    public static RESPOND_STREAM: number = 0x041;
    public static RESPOND_CAMERA_INFO: number = 0x042;
    public static RESPOND_PICTURE_PRE: number = 0x043;
    public static RESPOND_PICTURE: number = 0x044;
    public static RESPOND_PICTURE_LIST: number = 0x045;
    public static RESPOND_SETTINGS_DATA: number = 0x046;
    public static RESPOND_ACCESSOR_RESULT_ADD: number = 0x047;
    public static RESPOND_ACCESSOR_RESULT_CHANGE_ADMIN: number = 0x048;
    public static RESPOND_ACCESSOR_RESULT_REMOVE: number = 0x049;
    public static RESPOND_UPDATE_NEXT: number = 0x050;
    public static RESPOND_UPDATE_PART: number = 0x051;
    public static RESPOND_UPDATE_ERROR: number = 0x052;
    public static RESPOND_UPDATE_FINISH: number = 0x053;
    public static RESPOND_UPDATE_STATUS: number = 0x054; // to user only
    public static RESPOND_SD_FORMAT: number = 0x055;
    public static RESPOND_RESTORE_FABRIC_SETTINGS: number = 0x056;
    public static RESPOND_SETTINGS_CHANGE: number = 0x057;
    public static RESPOND_TEMP_READINGS: number = 0x058;
    public static RESPOND_DEBUG_INFO: number = 0x059;

    // ERRORS
    public static STATUS: number = 0x090;
    public static ERROR_UNDEFINED: number = 0x091;
    public static ERROR_CAMERA_OFFLINE: number = 0x092;
    public static ERROR_ACCESS_DENIED: number = 0x093;
}