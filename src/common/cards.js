export const CardType = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'skip', 'reverse', 'draw-two', 'wild', 'wild-draw'];

export default function Card({color, cardType}) {

    switch (cardType) {
        case 'zero':
            return (
                <svg width={242} height={362} xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(4 0 0 4 1 -1328.449)">
                        <rect
                            width={60}
                            height={90}
                            rx={10}
                            ry={10}
                            y={332.362}
                            style={{
                                fill: "#fff",
                                fillOpacity: 1,
                                fillRule: "evenodd",
                                stroke: "#000",
                                strokeWidth: 0.5,
                                strokeMiterlimit: 4,
                                strokeDasharray: "none",
                            }}
                        />
                        <rect
                            width={50}
                            height={80}
                            rx={5}
                            ry={5}
                            x={5}
                            y={337.362}
                            style={{
                                fill: "#f55",
                                fillOpacity: 1,
                                fillRule: "evenodd",
                                stroke: "none",
                            }}
                        />
                        <path
                            d="M45 352.362c-22.091 0-40 17.909-40 40 0 5.523 4.477 10 10 10 22.091 0 40-17.908 40-40 0-5.523-4.477-10-10-10z"
                            style={{
                                fill: "#fff",
                                fillOpacity: 1,
                                fillRule: "evenodd",
                                stroke: "none",
                            }}
                        />
                        <path
                            d="M30 362.362c-5.523 0-10 4.477-10 10v10c0 5.523 4.477 10 10 10s10-4.477 10-10v-10c0-5.523-4.477-10-10-10zm0 5a5 5 0 0 1 5 5v10a5 5 0 0 1-10 0v-10a5 5 0 0 1 5-5z"
                            style={{
                                fill: "#f55",
                                fillOpacity: 1,
                                fillRule: "evenodd",
                                stroke: "none",
                            }}
                        />
                        <path
                            d="M12.5 339.862a5 5 0 0 0-5 5v5a5 5 0 1 0 10 0v-5a5 5 0 0 0-5-5zm0 2.5a2.5 2.5 0 0 1 2.5 2.5v5a2.5 2.5 0 0 1-5 0v-5a2.5 2.5 0 0 1 2.5-2.5zM47.5 399.862a5 5 0 0 0-5 5v5a5 5 0 1 0 10 0v-5a5 5 0 0 0-5-5zm0 2.5a2.5 2.5 0 0 1 2.5 2.5v5a2.5 2.5 0 0 1-5 0v-5a2.5 2.5 0 0 1 2.5-2.5z"
                            style={{
                                fill: "#fff",
                                fillOpacity: 1,
                                fillRule: "evenodd",
                                stroke: "none",
                            }}
                        />
                    </g>
                </svg>
            )
    }
}
