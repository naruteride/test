import React from 'react';
import { marked } from 'marked';

const renderer = new marked.Renderer();

// 마크다운 헤더 렌더링
renderer.heading = (text, level) => {
    const noSpaceText = text.replace(/\s+/g, '-'); // 띄어쓰기를 대시로 변경

    if (level === 1 || level === 2 || level === 3) {
        return `<h${level} id="${noSpaceText}">${text} <a href="#${noSpaceText}">#</a></h${level}>`;
    }
    return `<h${level}>${text}</h${level}>`;
};

// 마크다운 인용문 렌더링
renderer.blockquote = (quote) => {
    // 클릭 시 클립보드에 해당 텍스트 추가
    // 줄바꿈을 '\n'로 변경 및 문자열의 앞뒤에 태그 제거
    return `<blockquote onclick="navigator.clipboard.writeText('${quote.replace(/\n/g, '\\n').slice(3, -6)}')">${quote}</blockquote>`;
};

function App() {
    return (
        <Editor />
    );
}

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.textAreaRef = React.createRef();
        this.state = {
            parsedMarkdown: '',
        };
    }

    // 텍스트 삭제 버튼 메서드
    clearText = () => {
        this.textAreaRef.current.value = '';
    };

    // 애너그램 개수 출력 버튼 메서드
    countAnagrams = () => {
        if (this.textAreaRef.current) {
            const text = this.textAreaRef.current.value;
            const words = text.split(/\s+/).filter(word => word.length > 0);
            const anagramCount = this.calculateAnagrams(words);
            alert(`애너그램의 수: ${anagramCount}`);
        }
    };

    // 단어 배열에 있는 애너그램의 개수를 계산하는 함수
    calculateAnagrams(words) {
        const sortedWords = words.map(word => word.split('').sort().join(''));
        const wordCount = {};

        sortedWords.forEach(word => {
            wordCount[word] = (wordCount[word] || 0) + 1;
        });


        let anagramCount = 0;

        for (let key in wordCount) {
            if (wordCount[key] > 1) {
                anagramCount++;
            }
        }

        return anagramCount;
    }

    parseMarkdown = () => {
        const markdownText = this.textAreaRef.current.value;
        const parsedMarkdown = marked(markdownText, { renderer });
        this.setState({ parsedMarkdown });
    };

    render() {
        return (
            <div>
                <BaseTextArea forwardedRef={this.textAreaRef} className={"@@@@@-CLASS-NAME-@@@@@"} />
                <button onClick={this.clearText}>텍스트 삭제</button>
                <button onClick={this.countAnagrams}>애너그램 개수 출력</button>
                <button onClick={this.parseMarkdown}>마크다운 파싱</button>
                <div dangerouslySetInnerHTML={{ __html: this.state.parsedMarkdown }} />
            </div>
        );
    }
}

// className을 제외한 나머지 props가 textarea로 전달
function BaseTextArea({ forwardedRef, className, ...props }) {
    return <textarea ref={forwardedRef} {...props} />;
}

export default App;

