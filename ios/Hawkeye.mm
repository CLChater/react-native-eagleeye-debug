#import "Hawkeye.h"
#import "STRNManager.h"
#import "STRNEventProperty.h"
#import "JSONUtils.h"
#import "STInfoConst.h"
#import <React/RCTUIManager.h>

@interface Hawkeye ()

@end


@implementation Hawkeye
RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (instancetype)init {
    self = [super init];
    if (self) {
      
    }
    return self;
}

 - (void)onCatalystInstanceDestroy {
    // 清理资源
    // 例如移除通知监听器、停止服务等

     [[STRNManager sharedInstance] stopScheduler];

}

// React Native 调用的生命周期方法
- (void)invalidate {

    [[STRNManager sharedInstance] stopScheduler];

    RCTLogInfo(@"Resources cleaned up in invalidate.");
}



// 定义 init 方法
RCT_EXPORT_METHOD(init:(NSString *)applyKey
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
#ifdef DEBUG

        [[STRNManager sharedInstance] initializeWithAppKey:applyKey completionHandler:^(BOOL success) {
            if (success) {
                
                NSLog(@"+++++++++++++++++++cheng");
                
                // 返回初始化成功的信息
                NSMutableDictionary *resultMap = [NSMutableDictionary dictionary];
                resultMap[@"suc"] = @(YES);
                resultMap[@"msg"] = [NSString stringWithFormat:@"SDK initialized with appKey: %@", applyKey];
                resolve(resultMap);
            } else {
                // 初始化失败时返回错误信息
                NSError *error = [NSError errorWithDomain:@"com.hawkeye.sdk" code:100 userInfo:@{NSLocalizedDescriptionKey: @"Invalid appKey or initialization failed."}];
                reject(@"NATIVE_ERROR_CODE", @"Initialization failed", error);
            }
        }];
#else
        
        [[STRNManager sharedInstance] initializeWithAppKey:applyKey completionHandler:^(BOOL success) {
            if (success) {
                
                NSLog(@"+++++++++++++++++++cheng");
                
                // 返回初始化成功的信息
                NSMutableDictionary *resultMap = [NSMutableDictionary dictionary];
                resultMap[@"suc"] = @(YES);
                resultMap[@"msg"] = [NSString stringWithFormat:@"SDK initialized with appKey: %@", applyKey];
                resolve(resultMap);
            } else {
                // 初始化失败时返回错误信息
                NSError *error = [NSError errorWithDomain:@"com.hawkeye.sdk" code:100 userInfo:@{NSLocalizedDescriptionKey: @"Invalid appKey or initialization failed."}];
                reject(@"NATIVE_ERROR_CODE", @"Initialization failed", error);
            }
        }];
        
#endif

    }@catch (NSException *exception) {
        // 如果出现异常，调用 reject 返回错误
        reject(@"NATIVE_ERROR_CODE", exception.reason, nil);
    }
}

/// 设置用户属性
RCT_EXPORT_METHOD(userProperty:(NSString *)key value:(NSString *)value){
    @try {
#ifdef DEBUG
        [[STRNManager sharedInstance] insertUserPropertyWithKey:key value:value];
#else
        [[STRNManager sharedInstance] insertUserPropertyWithKey:key value:value];
#endif
    } @catch (NSException *exception) {
        NSLog(@"[Hawkeye] error:%@",exception);
    }
}

#pragma mark - 增加mark

/// 删除用户某个属性
RCT_EXPORT_METHOD(cleanUserProperty:(NSString *)key){
    @try {
#ifdef DEBUG
        [[STRNManager sharedInstance] deleteUserPropertyByKey:key];
#else
        [[STRNManager sharedInstance] deleteUserPropertyByKey:key];
#endif
    } @catch (NSException *exception) {
        NSLog(@"[Hawkeye] error:%@",exception);
    }
}

/// 删除所有用户属性
RCT_EXPORT_METHOD(cleanAllUserProperties){
    @try {
#ifdef DEBUG
        [[STRNManager sharedInstance] deleteDeviceInfoByTypeUserProperties];
#else
        [[STRNManager sharedInstance] deleteDeviceInfoByTypeUserProperties];
#endif
    } @catch (NSException *exception) {
        NSLog(@"[Hawkeye] error:%@",exception);
    }
}


/// 手动事件RN传过来的
RCT_EXPORT_METHOD(trackEvent:(NSString *)eventName trackJson:(NSString *)trackJson){
    @try {
    
#ifdef DEBUG
        if (trackJson.length > 0) {
            NSDictionary *propertyDict = [JSONUtils jsonStringToDictionary:trackJson];
            NSDictionary *properties = [STRNEventProperty eventProperties:propertyDict];
            [[STRNManager sharedInstance] trackWithEventName:eventName properties: properties trackType: STDB_TYPE_TRACK_MANUAL];
        }
#else
        if (trackJson.length > 0) {
            NSDictionary *propertyDict = [JSONUtils jsonStringToDictionary:trackJson];
            NSDictionary *properties = [STRNEventProperty eventProperties:propertyDict];
            [[STRNManager sharedInstance] trackWithEventName:eventName properties: properties trackType: STDB_TYPE_TRACK_MANUAL];
        }
#endif

    } @catch (NSException *exception) {
        NSLog(@"Hawkeye error:%@",exception);
    }
}


/// 点击
RCT_EXPORT_METHOD(trackViewClick:(int)viewId){
    @try {
#ifdef DEBUG
        [[STRNManager sharedInstance] trackViewClick:@(viewId)];
#else
        [[STRNManager sharedInstance] trackViewClick:@(viewId)];
#endif
    } @catch (NSException *exception) {
        NSLog(@"Hawkeye] error:%@",exception);
    }
}


/// 存储页面属性
RCT_EXPORT_METHOD(saveViewProperties:(int)viewId clickable:(BOOL)clickable viewProperties:(NSDictionary *)viewProperties){
    @try {
#ifdef DEBUG
        [[STRNManager sharedInstance] prepareView:@(viewId) clickable:clickable paramters:viewProperties];
#else
        [[STRNManager sharedInstance] prepareView:@(viewId) clickable:clickable paramters:viewProperties];
#endif
    } @catch (NSException *exception) {
        NSLog(@"[Hawkeye]-saveViewProperties error:%@",exception);
    }
}

RCT_EXPORT_METHOD(trackViewScreen:(NSDictionary *)params) {
    @try {
#ifdef DEBUG
        if (params) {
            // 自动采集页面浏览时 url 在 params
            NSString *url = params[@"hawkeyedataurl"];
            NSDictionary *properties = params[@"hawkeyedataparams"];
            [[STRNManager sharedInstance] trackViewScreen:url properties:properties autoTrack:YES];
        }
#else
        if (params) {
            // 自动采集页面浏览时 url 在 params
            NSString *url = params[@"hawkeyedataurl"];
            NSDictionary *properties = params[@"hawkeyedataparams"];
            [[STRNManager sharedInstance] trackViewScreen:url properties:properties autoTrack:YES];
        }
#endif
    } @catch (NSException *exception) {
        NSLog(@"[Hawkeye] error:%@",exception);
    }
}



RCT_EXPORT_METHOD(getId:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        
#ifdef DEBUG
        NSString *idStr = [[STRNManager sharedInstance] getId];
        resolve(idStr);  // 返回结果
#else
        NSString *idStr = [[STRNManager sharedInstance] getId];
        resolve(idStr);  // 返回结果
#endif
        
    } @catch (NSException *exception) {
        reject(@"NATIVE_ERROR_CODE", exception.reason, nil);  // 错误处理
    }
}




@end
