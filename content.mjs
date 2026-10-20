export const appName = "TapMe: Number Merge";




export const content = {
  en: {
    privacy: "Privacy policy", support: "Support", language: "简体中文", other: "zh", updated: "Effective date", contact: "Contact the developer", home: "Help center",
    summary: "Play without an account. Your progress and preferences are stored on your device. The game does not send your gameplay data to us.",
    privacyDescription: "What TapMe stores locally, how support messages are handled, and how to delete your data.",
    supportDescription: "Game rules, progress and sound troubleshooting, and a direct way to contact the developer.",
    sections: [
      { title: "1. Scope", paragraphs: ["This policy covers the TapMe: Number Merge iPhone app and its support and privacy pages. It describes the current version, which has no account system, advertising, in-app purchases, analytics SDK, or developer-operated cloud sync."] },
      { title: "2. Information stored on your device", paragraphs: ["The app stores your current board, remaining moves, current score, highest number, highest score, language preference, appearance preference, and sound/haptics setting locally. These values let you resume a game and keep your records and settings. They are not sent to a developer-operated server.", "The app does not request access to your contacts, photos, camera, microphone, or location, and does not access the advertising identifier or track you across other companies' apps or websites."] },
      { title: "3. Retention, deletion, and backups", paragraphs: ["Local progress and preferences remain on your device until changed or removed. Restarting a game replaces the current board but keeps your best records and settings. To remove all local app data, use Delete App in iPhone Settings; Offload App retains its documents and data.", "System backups may include app data according to your Apple backup settings. The app does not provide its own cloud backup or cross-device sync. Backups and their removal are managed through Apple's settings. We cannot retrieve or erase a save file on your device remotely."] },
      { title: "4. When you contact support", paragraphs: ["If you choose to email us, we receive your email address and the message or attachments you send. We use that information to reply, investigate the reported issue, and manage your request. Sending email is optional and is not required to play. Please avoid sending passwords, payment details, or unnecessary personal information.", "Support correspondence is retained only as needed to handle the request and any required recordkeeping. You can use the contact address below to request access, correction, or deletion of information you supplied. Email delivery and storage also involve the email service providers used by you and the developer."] },
      { title: "5. Visiting these pages and platform services", paragraphs: ["Opening a support or privacy link makes a network request to this website. Hosting and network providers may process technical request information, such as your IP address, browser information, requested page, and request time, under their own policies. This is separate from your offline game save. We do not add advertising trackers or analytics SDKs to these pages, and there is no contact form or account registration here.", "Apple independently operates the App Store, device backups, and system diagnostics. Data handled by those services depends on your settings and Apple's policies. TapMe does not include a separate crash-reporting or analytics SDK."] },
      { title: "6. Third-party code and sharing", paragraphs: ["The app uses MMKV for local storage and SnapKit for interface layout. In this app, these libraries are not used to send your gameplay data to their providers. We do not sell gameplay data or share it with advertisers. Information voluntarily sent for support is handled as described above and may be disclosed when required by applicable law."] },
      { title: "7. Children and privacy", paragraphs: ["The game does not require personal details from players of any age. If you believe a child has sent personal information to our support address, contact us so we can address the request and remove it when appropriate."] },
      { title: "8. Changes and questions", paragraphs: ["If data practices change, this page will be updated with a new effective date. Material changes will be communicated as appropriate before the new practice takes effect. For privacy questions or requests concerning a support message, use the contact details below."] },
    ],
    steps: ["Tap a tile to increase its number by 1. Each tap uses one of your five available moves.", "Connect three or more equal numbers horizontally or vertically. The group merges into one tile, and that tile increases by 1.", "A merge adds the pre-upgrade number multiplied by the number of cleared tiles to your score. It also restores one move, up to five.", "Tiles fall and new numbers arrive. Chain reactions can create more merges. The game ends when no moves remain and all merges have finished."],
    faq: [
      ["Does the game need an internet connection?", "The game works offline and requires no account. Viewing these help pages or sending a support email requires an internet connection."],
      ["Where is my progress saved?", "Your current game, best records, and settings are stored locally. There is no developer-operated cloud sync. Deleting the app removes its local data; do not delete it as a first troubleshooting step."],
      ["What does Restart reset?", "Restart begins a fresh board and resets the current game's score and moves. Your highest score, highest number, and preferences are kept."],
      ["Why can't I hear sound?", "Open Settings in the game and enable Sound & Haptics. Check the iPhone's silent mode, volume, and connected headphones or Bluetooth devices. If sound stops after a call, return to the game and try again."],
      ["How do I change the language or appearance?", "Tap the settings gear, then select Language or change Dark Mode. Language changes apply in the app. The Sound & Haptics switch controls both sound effects and vibration."],
      ["Which devices are supported?", "This version is designed for iPhone in portrait orientation, on iOS 15 or later. A native iPad layout is not currently provided."],
      ["How do I report a problem?", "Email the developer with your app version, iPhone model, iOS version, what happened, and the steps to reproduce it. Screenshots are optional; remove personal information before sharing. We will not ask for your password or payment details."],
    ],
    how: "How to play", questions: "Frequently asked questions", contactBody: "Need a hand or have a privacy question? Email us with a short description. Do not include passwords or payment information.", emailAction: "Email support", mailSubject: "TapMe support", requestHint: "App version · iPhone model · iOS version · Steps to reproduce", supportTitle: "A hand with your next move.", privacyTitle: "Your game. Your privacy.",
  },
  zh: {
    privacy: "隐私政策", support: "游戏支持", language: "English", other: "en", updated: "生效日期", contact: "联系开发者", home: "帮助中心",
    summary: "无需注册账号即可游玩。游戏进度和偏好设置保存在你的设备上，游戏不会将游玩数据发送给我们。",
    privacyDescription: "了解 TapMe 的本地数据存储、支持邮件处理方式，以及如何删除数据。",
    supportDescription: "玩法说明、存档与音效常见问题，以及开发者联系方式。",
    sections: [
      { title: "1. 适用范围", paragraphs: ["本政策适用于 TapMe: Number Merge iPhone 应用及其支持和隐私政策页面。当前版本没有账号系统、广告、应用内购买、分析 SDK 或开发者运营的云同步服务。"] },
      { title: "2. 保存在设备上的信息", paragraphs: ["应用在设备本地保存当前棋盘、剩余点击次数、当前分数、最高数字、最高分、语言偏好、外观偏好，以及声音与触觉开关。这些信息用于恢复游戏、保留纪录和设置，不会发送到开发者运营的服务器。", "应用不请求通讯录、照片、相机、麦克风或位置权限，不访问广告标识符，也不跨其他公司的应用或网站跟踪你。"] },
      { title: "3. 保留、删除与备份", paragraphs: ["本地游戏数据和偏好设置会保留在设备上，直到被修改或删除。重新开始游戏会替换当前棋盘，但保留最高纪录和设置。如需删除所有本地应用数据，请在 iPhone 设置中使用“删除 App”；“卸载 App”会保留文稿与数据。", "根据你的 Apple 备份设置，系统备份可能包含应用数据。本应用不提供独立的云备份或跨设备同步。系统备份及其删除由 Apple 的相关设置管理。我们无法远程恢复或删除设备上的存档。"] },
      { title: "4. 主动联系支持时的信息", paragraphs: ["如果你选择发送邮件，我们会收到你的邮箱地址及主动提供的内容或附件，仅用于回复、调查所报告的问题和处理请求。发送邮件是可选的，不影响正常游玩。请勿发送密码、付款信息或不必要的个人信息。", "支持邮件仅在处理请求及必要记录保存所需的时间内保留。你可以通过下方联系方式申请访问、更正或删除主动提供的信息。邮件的传输和存储也会涉及你和开发者所使用的邮件服务商。"] },
      { title: "5. 访问网页与平台服务", paragraphs: ["打开支持或隐私政策链接会向本网站发起网络请求。托管及网络服务商可能依据各自政策处理 IP 地址、浏览器信息、访问页面和请求时间等技术信息。这与离线游戏存档不同。我们未在这些页面主动加入广告追踪器或分析 SDK，页面也没有联系表单或账号注册功能。", "App Store、设备备份和系统诊断由 Apple 独立提供，其数据处理取决于你的设置及 Apple 的政策。TapMe 未集成独立的崩溃上报或分析 SDK。"] },
      { title: "6. 第三方代码与共享", paragraphs: ["应用使用 MMKV 进行本地存储、使用 SnapKit 进行界面布局；在本应用中，这些库不会被用于向其提供方发送你的游玩数据。我们不出售游玩数据，也不将其共享给广告商。你主动发送的支持信息按上文方式处理，并可能在适用法律要求时披露。"] },
      { title: "7. 儿童隐私", paragraphs: ["游戏不要求任何年龄的玩家提供个人资料。如果你认为儿童向支持邮箱发送了个人信息，请联系我们，以便处理请求并在适当情况下删除相关信息。"] },
      { title: "8. 政策更新与咨询", paragraphs: ["数据处理方式发生变化时，我们会更新本页面及生效日期。重大变化将在适当情况下于新做法生效前通知。有关隐私或支持邮件中个人信息的请求，请使用下方联系方式。"] },
    ],
    steps: ["点击一个方块，数字增加 1，并消耗一次点击机会；初始有 5 次机会。", "让至少 3 个相同数字通过上下左右相邻连接成组。整组合并为一个方块，其数字增加 1。", "每次合并得分为“升级前的数字 × 被消除的方块数”，并返还 1 次点击机会，最多保留 5 次。", "方块下落并补充新数字，可能触发连锁合并。点击机会用完且所有合并结束后，本局结束。"],
    faq: [
      ["游戏需要联网吗？", "游戏可以离线游玩，无需注册账号。查看这些帮助页面或发送支持邮件需要联网。"],
      ["进度保存在什么地方？", "当前游戏、最高纪录和设置保存在设备本地，没有开发者运营的云同步服务。删除 App 会清除本地数据，遇到问题时请不要先删除应用。"],
      ["重新开始会清除什么？", "重新开始会生成新棋盘，并重置本局分数和点击机会。最高分、最高数字和偏好设置会保留。"],
      ["为什么听不到声音？", "在游戏设置中开启“音效与触觉”，检查 iPhone 静音模式、音量，以及耳机或蓝牙设备连接。若来电后声音中断，请返回游戏再试。"],
      ["如何更改语言或外观？", "点击齿轮打开设置，在“语言”中选择语言，或切换“深色模式”。语言切换在应用内生效。“音效与触觉”开关同时控制声音和震动。"],
      ["支持哪些设备？", "当前版本为运行 iOS 15 或更高版本的 iPhone 设计，采用竖屏布局，暂不提供原生 iPad 适配。"],
      ["如何反馈问题？", "请发送邮件，附上应用版本、iPhone 型号、iOS 版本、问题描述和复现步骤。截图为可选项，分享前请移除个人信息。我们不会索要你的密码或付款信息。"],
    ],
    how: "如何游玩", questions: "常见问题", contactBody: "需要游戏帮助或有隐私问题？请通过邮件简要描述情况，不要附带密码或付款信息。", emailAction: "发送支持邮件", mailSubject: "TapMe 游戏支持", requestHint: "应用版本 · iPhone 型号 · iOS 版本 · 复现步骤", supportTitle: "下一步，我们帮你。", privacyTitle: "你的游戏，你的隐私。",
  },
};
