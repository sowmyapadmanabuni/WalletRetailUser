
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

import com.walletretailuser.BuildConfig;
import com.walletretailuser.R;

// @react-native-community/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// lottie-react-native
import com.airbnb.android.react.lottie.LottiePackage;
// react-native-android-open-settings
import com.levelasquez.androidopensettings.AndroidOpenSettingsPackage;
// react-native-camera
import org.reactnative.camera.RNCameraPackage;
// react-native-cardview
import com.kishanjvaghela.cardview.RNCardViewPackage;
// react-native-ccavenue-encryption
import com.encryptccavenue.CcavenueEncryptionPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
// react-native-keyevent
import com.github.kevinejohn.keyevent.KeyEventPackage;
// react-native-local-auth
import io.tradle.reactlocalauth.LocalAuthPackage;
// react-native-open-security-settings
import com.securitysettings.OpenSecuritySettingsPackage;
// react-native-permissions
import com.reactnativecommunity.rnpermissions.RNPermissionsPackage;
// react-native-reanimated
import com.swmansion.reanimated.ReanimatedPackage;
// react-native-touch-id
import com.rnfingerprint.FingerprintAuthPackage;
// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;
// react-native-webview
import com.reactnativecommunity.webview.RNCWebViewPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new AsyncStoragePackage(),
      new LottiePackage(),
      new AndroidOpenSettingsPackage(),
      new RNCameraPackage(),
      new RNCardViewPackage(),
      new CcavenueEncryptionPackage(),
      new RNGestureHandlerPackage(),
      new KeyEventPackage(),
      new LocalAuthPackage(),
      new OpenSecuritySettingsPackage(),
      new RNPermissionsPackage(),
      new ReanimatedPackage(),
      new FingerprintAuthPackage(),
      new VectorIconsPackage(),
      new RNCWebViewPackage()
    ));
  }
}
