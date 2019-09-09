import React, {useState} from 'react';
import styles from './index.module.scss'

function Account() {
    const tabs = [
        {value: 0, label: '注册'},
        {value: 1, label: '登录'},
    ];
    let [activeTab, setActiveTab] = useState(0);
    return (
        <div className={styles.account_box}>
            <ul className={styles.account_tabs}>
                {tabs.map(({value, label}, i) => <li key={i} className={activeTab === value ? `${styles.tab} ${styles.tab_active}` : `${styles.tab}`} onClick={() => setActiveTab(value)}>{label}</li>)}
                <li className={styles.tab_underline} style={{transform: `translate3d(${activeTab * 110}px, 0, 0)`}}></li>
            </ul>
            <form className={styles.account_form}>
                <input className={styles.input} type="text" placeholder={activeTab ? '请输入用户名' : '请输入用户名或邮箱'}/>
                {
                    !activeTab ? <input className={styles.input} type="email" placeholder="请输入邮箱"/> : null
                }
                <input className={styles.input} type="password" placeholder="请输入密码"/>
                <button className={styles.button}>{activeTab ? '登录' : '注册'}</button>
                <label className={styles.desc}>{activeTab ? '没有账号' : '已有账号'}？<span onClick={() => setActiveTab(activeTab ? 0 : 1)}>{activeTab ? '请注册' : '请登录'}</span></label>
            </form>
        </div>
    )
}

function Info() {
    return (
        <div>

        </div>
    )
}

export default function AccountInfo() {
    return (
        <div className={styles.user_info}>
            {true ? <Account/> : <Info/>}
        </div>
    )
}