import DEFAULT from './user-default-config';
import DelayAction from '../../utils/delay-action';

class UserConfig {

    static DEFAULT = DEFAULT;

    constructor(config) {
        if(config && config.version !== DEFAULT.version) {
            config = null;
        }
        this.$ = Object.assign({}, DEFAULT, config);

        this.changeAction = new DelayAction(() => {
            this.onChange(this.lastChange, this);
            this.lastChange = null;
        });
    }

    plain() {
        return Object.assign({}, this.$);
    }

    exportCloud() {
        let config = {};
        Object.keys(this.$).forEach(key => {
            if(key.indexOf('local.') !== 0) {
                config[key] = this.$[key];
            }
        });
        return config;
    }

    makeChange(change) {
        this.lastChange = Object.assign({}, this.lastChange, change);

        if(typeof this.onChange === 'function') {
            this.changeAction.do();
        }
        this.$.lastChangeTime = new Date().getTime();
    }

    get(key, defaultValue) {
        if(this.$) {
            let val = this.$[key];
            if(val !== undefined) {
                return val;
            }
        }
        if(defaultValue === undefined) {
            defaultValue = DEFAULT[key];
        }
        return defaultValue;
    }

    set(keyOrObj, value) {
        if(typeof keyOrObj === 'object') {
            Object.assign(this.$, keyOrObj);
            this.makeChange(keyOrObj);
        } else {
            this.$[keyOrObj] = value;
            this.makeChange({[keyOrObj]: value});
        }
    }

    reset(newConfig) {
        this.$ = Object.assign({}, DEFAULT, newConfig);
        this.makeChange(this.$);
    }

    get autoReconnect() {
        return this.get('user.autoReconnect');
    }

    set autoReconnect(flag) {
        return this.set('user.autoReconnect', flag);
    }

    get lastSaveTime() {
        return this.get('lastSaveTime');
    }

    set lastSaveTime(time) {
        if(time instanceof Date) {
            time = time.getTime();
        }
        return this.set('lastSaveTime', time);
    }

    get showMessageTip() {
        return this.get('ui.chat.showMessageTip');
    }

    set showMessageTip(flag) {
        return this.set('showMessageTip', flag);
    }

    get sendHDEmoticon() {
        return this.get('ui.chat.sendHDEmoticon');
    }

    set sendHDEmoticon(flag) {
        return this.set('sendHDEmoticon', flag);
    }

    isChatSidebarHidden(cgid) {
        return !!this.get(`ui.chat.hideSidebar.${cgid}`);
    }

    setChatSidebarHidden(cgid, flag) {
        return this.set(`ui.chat.hideSidebar.${cgid}`, flag);
    }

    get showMeOnMenu() {
        return !!this.get('ui.chat.menu.showMe');
    }

    set showMeOnMenu(flag) {
        return this.set('ui.chat.menu.showMe', flag);
    }

    get enableSearchInEmojionePicker() {
        return this.get('ui.chat.enableSearchInEmojionePicker');
    }

    set enableSearchInEmojionePicker(flag) {
        return this.set('ui.chat.enableSearchInEmojionePicker', flag);
    }

    get showMessageTip() {
        return this.get('ui.chat.showMessageTip');
    }

    set showMessageTip(flag) {
        return this.set('ui.chat.showMessageTip', flag);
    }

    get enableWindowNotification() {
        return this.get('ui.notify.enableWindowNotification');
    }

    set enableWindowNotification(flag) {
        return this.set('ui.notify.enableWindowNotification', flag);
    }

    get safeWindowNotification() {
        return this.get('ui.notify.safeWindowNotification');
    }

    set safeWindowNotification(flag) {
        return this.set('ui.notify.safeWindowNotification', flag);
    }

    get windowNotificationCondition() {
        return this.get('ui.notify.windowNotificationCondition');
    }

    set windowNotificationCondition(condition) {
        return this.set('ui.notify.windowNotificationCondition', condition);
    }

    get enableSound() {
        return this.get('ui.notify.enableSound');
    }

    set enableSound(flag) {
        return this.set('ui.notify.enableSound', flag);
    }

    get playSoundCondition() {
        return this.get('ui.notify.playSoundCondition');
    }

    set playSoundCondition(condition) {
        return this.set('ui.notify.playSoundCondition', condition);
    }

    get flashTrayIcon() {
        return this.get('ui.notify.flashTrayIcon');
    }

    set flashTrayIcon(flag) {
        return this.set('ui.notify.flashTrayIcon', flag);
    }

    get flashTrayIconCondition() {
        return this.get('ui.notify.flashTrayIconCondition');
    }

    set flashTrayIconCondition(condition) {
        return this.set('ui.notify.flashTrayIconCondition', condition);
    }
}

export default UserConfig;
