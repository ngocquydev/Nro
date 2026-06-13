import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
function CopyButton({ text }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async text => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        alert('Copy thành công');
        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };

    return (
        <div>
            {text}
            <span className='ms-2' onClick={() => handleCopy(text)}>
                <FiCopy />
            </span>
        </div>
    );
}
export default CopyButton;
