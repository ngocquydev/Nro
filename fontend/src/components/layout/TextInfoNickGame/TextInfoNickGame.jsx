import { Card } from 'react-bootstrap';
import styles from './styles.module.css';
import { useState } from 'react';
import { listMenuInfo } from './contans/contans';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
function TextInfoNickGame() {
    const { listMenu1, listMenu2 } = styles;
    const [show, setShow] = useState(false);

    const handleToggle = () => {
        setShow(prev => !prev);
    };

    return (
        <Card>
            <div
                style={{
                    backgroundColor: '#ebf5ff',
                    padding: '18px',
                    maxHeight: show ? 'none' : '220px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                }}
            >
                {listMenuInfo.map((section, index) => (
                    <div key={index} className='mb-4'>
                        <strong className={section.danger ? 'text-danger' : ''}>
                            {section.title}
                        </strong>

                        {section.content && <p>{section.content}</p>}

                        {section.list && (
                            <ul className={listMenu1}>
                                {section.list.map((item, i) => (
                                    <li key={i}>
                                        <strong>{item.strong}</strong>{' '}
                                        {item.text}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {section.listSimple && (
                            <ul className={listMenu2}>
                                {section.listSimple.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        )}

                        {section.note && <p>{section.note}</p>}
                    </div>
                ))}
            </div>

            <Card.Footer
                className='text-center text-primary'
                style={{ cursor: 'pointer' }}
                onClick={handleToggle}
            >
                {show ? 'Thu Gọn' : 'Xem Thêm'}
                {show ? <BsChevronDown /> : <BsChevronUp />}
            </Card.Footer>
        </Card>
    );
}
export default TextInfoNickGame;
