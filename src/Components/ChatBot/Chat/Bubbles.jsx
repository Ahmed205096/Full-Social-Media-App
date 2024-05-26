import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // You can choose different styles
import "../Style/Bubbles.css";


export default function Bubbles({ message, className }) {
  const [displayedMessage, setDisplayedMessage] = useState("");

  const ref = useRef(null);

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [displayedMessage]);

  const copySucceeded = () => {
    Swal.fire({
      title: "Message copied",
      html: "Copied!",
      timer: 300,
      icon: "success",
      showConfirmButton: false,
    });
  };

  const formatResponse = (text) => {
    // Handle code blocks
    text = text.replace(/```([\s\S]*?)```/g, (match, p1) => {
      const highlightedCode = hljs.highlightAuto(p1).value;
      return `<pre><code class="hljs">${highlightedCode}</code></pre>`;
    });

    // Replace ** with <b>
    text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

    // Replace * with <li>
    text = text.replace(/\* (.*?)\n/g, "<li>$1</li>");

    // Wrap <li> with <ul>
    text = text.replace(/(<li>.*?<\/li>)/g, "<ul>$1</ul>");

    return text;
  };

  useEffect(() => {
    const words = message.split(" ");
    let currentWordIndex = 0;
    let currentMessage = "";

    const interval = setInterval(() => {
      if (currentWordIndex < words.length) {
        currentMessage += words[currentWordIndex] + " ";
        setDisplayedMessage(formatResponse(currentMessage));
        currentWordIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [message]);

  return (
    <div className={className}>
      <div className="message-bubble">
        <pre
          style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}
          onClick={() => {
            navigator.clipboard.writeText(message);
            copySucceeded();
          }}
          dangerouslySetInnerHTML={{ __html: displayedMessage }}
        />
      </div>
      <span ref={ref} />
    </div>
  );
}
