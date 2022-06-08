package com.alamitest;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;
import com.facebook.react.bridge.Callback;
import android.os.Build;

public class DeviceInfoModule extends ReactContextBaseJavaModule {
    DeviceInfoModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "DeviceInfoModule";
    }

    @ReactMethod
    public void getDeviceId(Callback callBack) {
        callBack.invoke(Build.BOARD);
    }
}