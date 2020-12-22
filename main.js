auto.waitFor();
// 唤醒手机
if (!device.isScreenOn()) {
  device.wakeUpIfNeeded()
  // 解锁界面
  gesture(500, [300, device.height * 0.8], [300, 300]);
}

var checkTimeGap = 60 * 1000;

function hasRecheckBtn() {
  var recheckBtn = desc("重新打卡").findOnce();

  if (recheckBtn) {
    return true;
  } else {
    return false;
  }
}

function checkTime() {
  setInterval(function () {
    const today = new Date();
    toast(today.getHours());

    if (hasRecheckBtn()) {
      var recheckBtn = desc("重新打卡").findOnce();
      recheckBtn.click();
      sleep(1000)

      click(device.width / 2, (device.height - 150)) // 点击提交按钮
    } else {
      if (today.getHours() >= 17) {
        click(738, 1200); //  点击签退
        sleep(6000); // 加载时间
        click(device.width / 2, (device.height - 150)) // 点击提交按钮
      }

      if (today.getHours() <= 8 && new Date().getHours() > 7) {
        click(432, 1200); //  点击签到
        sleep(6000); // 加载时间
        click(device.width / 2, (device.height - 150)) // 点击提交按钮
      }
      app.launchApp("Auto.js");
    }
  }, checkTimeGap);
}

checkTime();

app.launchApp("Auto.js");

app.startActivity({
  action: "android.intent.action.MAIN",
  packageName: "com.seeyon.cmp",
  className: "com.seeyon.cmp.ui.LoadActivity",
  category: ["android.intent.category.LAUNCHER"],
  flags: ["activity_new_task"]
});

sleep(7000);

// 滑动到顶部
gesture(1000, [300, 300], [300, 1000]);

sleep(1500);


var checkInItem = className("android.widget.LinearLayout").depth(14).indexInParent(0).findOnce();

if (checkInItem) {
  checkInItem.click();

  sleep(3000);

  click(831, 1974); // 点击查看详情

  sleep(5000);

  click(device.width / 2, device.height * 0.8); //  点击签到
}
