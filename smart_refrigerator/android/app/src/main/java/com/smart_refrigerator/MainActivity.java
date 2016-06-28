package com.smart_refrigerator;

import com.facebook.react.ReactActivity;
import com.remobile.splashscreen.RCTSplashScreenPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.remobile.splashscreen.*;

import java.util.Arrays;
import java.util.List;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;


public class MainActivity extends ReactActivity {
    private ReactNativePushNotificationPackage mReactNativePushNotificationPackage;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "smart_refrigerator";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        mReactNativePushNotificationPackage = new ReactNativePushNotificationPackage(this);
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RCTCameraPackage(),
            new RCTSplashScreenPackage(this),
            mReactNativePushNotificationPackage // <---- Add the Package
        );
    }
}
