//
//  STRNManager.h
//  SecureAnalyticsDemo
//
//  Created by edy on 2024/11/29.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface STRNManager : NSObject

@property (nonatomic, strong) NSMutableArray *pointArr;

@property (nonatomic, strong) NSNumber *reactTag;

@property (nonatomic, copy) NSString *currentAppKey;

+ (instancetype)sharedInstance;


/// 初始化
/// - Parameter appKey: key
- (void)initializeWithAppKey:(NSString *)appKey completionHandler:(void (^)(BOOL success, NSError * _Nonnull error))completionHandler;

// 插入用户属性 key - value
- (void)insertUserPropertyWithKey:(NSString *)propertyKey value:(NSString *)propertyValue;
// 删除用户属性 key - value
- (void)deleteUserPropertyByKey:(NSString *)propertyKey;
// 删除所有用户属性
- (void)deleteDeviceInfoByTypeUserProperties;

///**
// @abstract
// 获取 View 的可点击状态
//
// @param view  获取状态的 View 对象
// @return 点击状态
// */
//- (BOOL)clickableForView:(UIView *)view;

/**
@abstract
记录 View 的点击状态及自定义属性 (会关联到当前正在显示的 RCTRootView 上)

@param reactTag  React Native 分配的唯一标识符
@param clickable  是否可点击
@param paramters  自定义属性
*/
- (void)prepareView:(NSNumber *)reactTag clickable:(BOOL)clickable paramters:(NSDictionary *)paramters;

/**
@abstract
记录 View 的点击状态及自定义属性

@param reactTag  React Native 分配的唯一标识符
@param clickable  是否可点击
@param paramters  自定义属性
@param rootTag  RCTRootView 的 reactTag
*/
- (void)prepareView:(NSNumber *)reactTag clickable:(BOOL)clickable paramters:(NSDictionary *)paramters rootTag:(NSNumber *)rootTag;

/**
 @abstract
 触发 React Native 点击事件

 @param reactTag  React Native 分配的唯一标识符
 */
- (void)trackViewClick:(NSNumber *)reactTag;

/**
 @abstract
 触发 React Native 页面浏览事件

 @param url  页面路径
 @param properties  自定义页面属性
 @param autoTrack  是否为自动埋点
 */
- (void)trackViewScreen:(nullable NSString *)url properties:(nullable NSDictionary *)properties autoTrack:(BOOL)autoTrack;


/// 自定义拦截事件
- (void)customTrackView;


/// 自定义设备事件
- (void)trackWithEventName:(NSString *)eventName
                properties:(NSDictionary *)properties
                 trackType:(NSString *)trackType;

// 获取设备Id
- (NSString *)getId;


/// 停止定时器
- (void)stopScheduler;

/// reportEvent
- (void)reportEvent;


@end



NS_ASSUME_NONNULL_END
