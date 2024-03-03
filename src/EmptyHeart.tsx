import React from "react";

function EmptyHeart() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="none"
            viewBox="0 0 22 22"
        >
            <path
                stroke="#41BB45"
                d="M5.882 15.172c-1.812-1.912-3.26-3.186-3.728-5.203-.348-1.499-.245-4.24 1.796-5.516 4.5-2.815 7.022 1.504 7.022 1.504h.056s2.521-4.32 7.022-1.504c2.04 1.276 2.144 4.017 1.796 5.516-.467 2.017-1.916 3.291-3.728 5.203C11 20 11.003 20.005 11 20l-5.118-4.828z"
                clipRule="evenodd"
            ></path>
            <path
                stroke="url(#paint0_linear_1_93)"
                d="M5.882 15.172c-1.812-1.912-3.26-3.186-3.728-5.203-.348-1.499-.245-4.24 1.796-5.516 4.5-2.815 7.022 1.504 7.022 1.504h.056s2.521-4.32 7.022-1.504c2.04 1.276 2.144 4.017 1.796 5.516-.467 2.017-1.916 3.291-3.728 5.203C11 20 11.003 20.005 11 20l-5.118-4.828z"
                clipRule="evenodd"
            ></path>
            <path
                stroke="url(#paint1_linear_1_93)"
                d="M5.882 15.172c-1.812-1.912-3.26-3.186-3.728-5.203-.348-1.499-.245-4.24 1.796-5.516 4.5-2.815 7.022 1.504 7.022 1.504h.056s2.521-4.32 7.022-1.504c2.04 1.276 2.144 4.017 1.796 5.516-.467 2.017-1.916 3.291-3.728 5.203C11 20 11.003 20.005 11 20l-5.118-4.828z"
                clipRule="evenodd"
            ></path>
            <defs>
                <linearGradient
                    id="paint0_linear_1_93"
                    x1="9.284"
                    x2="24.876"
                    y1="-4.853"
                    y2="4.913"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#59D44F"></stop>
                    <stop offset="1" stopColor="#36B433"></stop>
                </linearGradient>
                <linearGradient
                    id="paint1_linear_1_93"
                    x1="9.284"
                    x2="24.876"
                    y1="-4.853"
                    y2="4.913"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#D44F4F"></stop>
                    <stop offset="1" stopColor="#B43333"></stop>
                </linearGradient>
            </defs>
        </svg>
    );
}

export default React.memo(EmptyHeart);
