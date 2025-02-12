//
//  JSONUtils.h
//  SecureAnalyticsDemo
//
//  Created by edy on 2024/12/3.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface JSONUtils : NSObject

// 将 JSON 字符串转换为字典
+ (NSDictionary *)jsonStringToDictionary:(NSString *)jsonString;

// 将字典转换为 JSON 字符串
+ (NSString *)dictionaryToJsonString:(NSDictionary *)dictionary;

// 合并 JSON 对象
+ (void)mergeJSONObject:(NSDictionary *)source toDictionary:(NSMutableDictionary *)destination;

@end

NS_ASSUME_NONNULL_END
