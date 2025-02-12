//
//  STRNEventProperty.h
//  SecureAnalyticsDemo
//
//  Created by edy on 2024/12/3.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface STRNEventProperty : NSObject

/// 事件属性中添加 $lib_method 和 $lib_plugin_version 属性，$lib_method 默认为 code
/// @param properties 事件自定义属性
+ (NSDictionary *)eventProperties:(nullable NSDictionary *)properties;

/// 事件属性中添加 $lib_method 和 $lib_plugin_version 属性
/// @param properties 事件自定义属性
/// @param isAuto 设置为 YES 时 $lib_method 为 autoTrack，为 NO 时 $lib_method 为 code
+ (NSDictionary *)eventProperties:(nullable NSDictionary *)properties isAuto:(BOOL)isAuto;



@end

NS_ASSUME_NONNULL_END
