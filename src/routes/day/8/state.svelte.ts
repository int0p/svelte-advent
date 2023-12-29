export class Game {
	scores: number[] = $state([]);
	highScore: number | undefined = $derived([...this.scores].sort((a, b) => a - b)[0]);
	cards: number[] = $state([]);
	selected: number[] = $state([]);
	matches: number[] = $state([]);
	gameComplete: boolean = $derived(this.matches.length === this.cards.length / 2);
	status: "ready" | "in progress" | "ended" = $state("ready");
	time: number = $state(0);

	constructor(numCards: number) {
		this.cards = createArray(numCards);

		$effect(() => {
			if (this.gameComplete) {
				this.scores.push(this.time);
				this.status = "ended";
				this.resetGame();
			}
		});

		$effect(() => {
			let interval: number;

			if (this.status === "in progress") {
				interval = setInterval(() => {
					if (this.status === "ended") {
						clearInterval(interval);
						return;
					}
					this.time++;
				}, 1000);
			}

			return () => {
				clearInterval(interval);
			};
		});
	}

	startGame = () => {
		this.status = "in progress";
	};

	resetGame = () => {
		this.cards = shuffleArr(this.cards);
		this.selected = [];
		this.matches = [];
		this.time = 0;
		this.status = "ready";
	};

	checkMatch = (idx: number) => {
        if (this.selected.length === 2) {
			this.selected = [];
		}

		if (this.selected.length === 0) {
			this.selected.push(idx);
			return;
		}

		if (this.selected.length === 1) {
			if (this.selected[0] === idx) {
				return;
			} else {
				this.selected.push(idx);
			}
		}

        if (this.selected.length !== 2) throw new Error("Invalid state");

		const curCard = this.cards[idx];
		const prev = this.selected[0];
		if (prev === undefined) return; 
		const prevCard = this.cards[prev];

		if (prevCard && curCard === prevCard) {
			this.matches.push(prevCard);	
            this.selected = [];		
		}
	};
}

function createArray(numCards: number): number[] {
	if (numCards > 24) throw new Error("Too many cards!");

	const arr = Array.from({ length: numCards }, (_, i) => i + 1);
	const doubled = [...arr, ...arr];
	const shuffled = shuffleArr(doubled);

	return shuffled;
}

function shuffleArr(arr: number[]): number[] {
	// 원본 배열 수정, 수정된 배열 반환.
	for (let i = arr.length - 1; i > 0; i--) {
		// 0과 i 사이의 무작위 인덱스를 선택합니다
		const j = Math.floor(Math.random() * (i + 1));

		// i번째 요소와 j번째 요소를 바꿉니다
		//@ts-expect-error
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}
