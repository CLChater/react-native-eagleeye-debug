//
//  STInfoConst.h
//  SecureAnalyticsDemo
//
//  Created by edy on 2024/11/29.
//

#import <Foundation/Foundation.h>

extern NSString * const STSDKVersion;


// Device info related keys
extern NSString * const DEVICE_INFO;
extern NSString * const BUILD_MODEL;
extern NSString * const BUILD_BRAND;
extern NSString * const BUILD_PRODUCT;
extern NSString * const BUILD_RELEASE;
extern NSString * const RESOLUTION;
extern NSString * const USER_AGENT;
extern NSString * const BOOT_TIME; //上次开机时间
extern NSString * const SYSTEM_TIME;
extern NSString * const TIME_ZONE;
extern NSString * const TIME_HOUR_FORMAT;
extern NSString * const SYSTEM_LANGUAGE;
extern NSString * const SYSTEM_FONT_SCALE;
extern NSString * const SDK_VERSION;
extern NSString * const SYSTEM_TYPE; // iOS
extern NSString * const DEVICE_NAME; // xx的iphone
extern NSString * const IS_CHARGING;

extern NSString * const STAppName;
extern NSString * const STAppBundleId;
extern NSString * const STAppBuildNumber;
extern NSString * const STAppVersion;
extern NSString * const STAppFirstInstallTime;

//
extern NSString * const STIDFA;
extern NSString * const STIDFV;

extern NSString * const STMemoryAvailable;
extern NSString * const STMemoryTotal;
extern NSString * const STDiskTotal;
extern NSString * const STDiskAvailable;



// 位置信息
extern NSString * const STLatitude;
extern NSString * const STLongitude;
extern NSString * const STAltitude;
extern NSString * const STHorizontalAccuracy;




// Environment related keys
extern NSString * const ENV_INFO;
extern NSString * const IS_ROOT;
extern NSString * const IS_EMULATOR;
extern NSString * const NET_TYPE;
extern NSString * const LOCATION_INFO;
extern NSString * const IS_WIFIPROXY;
extern NSString * const PROXY_ADDRESS;

extern NSString * const IS_VPN;


// 信息类型 infoType
extern NSString * const STDB_TYPE_DEVICE_GENERAL;
extern NSString * const STDB_TYPE_DEVICE_ROUTE_IP;
extern NSString * const STDB_TYPE_TACK_AUTO;
extern NSString * const STDB_TYPE_TRACK_MANUAL;
extern NSString * const STDB_TYPE_USER_PROPERTIES;
extern NSString * const STDB_TYPE_DEVICE_SAGE;


// 常量配置
extern NSString * const SERVER_URL;
extern NSString * const URI_API;

extern NSString * const SERVER_APP_KEY;
extern NSString * const SERVER_APP_TYPE;
extern NSString * const SERVER_APP_CHANNEL;

extern NSString * const STKEYCHAINSERVICE;

// 事件相关属性
extern NSString * const VIEW_TYPE;
extern NSString * const VIEW_ID;
extern NSString * const VIEW_CONTENT;
extern NSString * const SCREEN_NAME;
extern NSString * const DRAW_POINT;
extern NSString * const EVENT;
extern NSString * const PROPERTIES;
extern NSString * const TIME;
extern NSString * const AEVENT;
extern NSString * const ROUTE_IP;
extern NSString * const USER_PROPERTIES;
extern NSString * const UNIQUEID;
extern NSString * const EVENT_LIST;

