//
//  RCTDeviceInfoModule.m
//  AlamiTest
//
//  Created by Muhammad Faisal Akbar on 08/06/22.
//

#import <Foundation/Foundation.h>
#import "RCTDeviceInfoModule.h"
#import <React/RCTLog.h>
#import <sys/utsname.h>

@implementation RCTDeviceInfoModule

// To export a module named RCTDeviceInfoModule
RCT_EXPORT_MODULE();


RCT_EXPORT_METHOD(getDeviceId: (RCTResponseSenderBlock)callback)
{
   struct utsname systemInfo;
   uname(&systemInfo);
   NSString* deviceId = [NSString stringWithCString:systemInfo.machine
                                           encoding:NSUTF8StringEncoding];
   #if TARGET_IPHONE_SIMULATOR
       deviceId = [NSString stringWithFormat:@"%s", getenv("SIMULATOR_MODEL_IDENTIFIER")];
   #endif
  callback(@[deviceId]);
 
}



@end
