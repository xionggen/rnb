import React, {useState} from 'react';
import MEditor from 'react-m-editor';
import styles from './index.module.scss';

export default function EditorModal(props) {
    const {visible, onClose} = props;
    let [content, setContent] = useState('');

    function saveArticle() { // 保存文章
        close();
    }

    function close() { // 关闭弹框并清空内容
        setContent('');
        onClose();
    }

    return visible ? (
        <div className={styles.editor_modal} onClick={close}>
            <div className={styles.editor_box} onClick={e => e.stopPropagation()}>
                <input className={styles.title} type="text" placeholder="请输入文章标题"/>
                <MEditor value={content} onChange={(val) => setContent(val)}/>
                <button className={styles.save_btn} onClick={saveArticle}>保存</button>
            </div>
        </div>
    ) : null
}