<script lang="ts">
	type HeartRate = {
		heartRate: number;
		timestamp: number;
	};

	const modes = [
		{
			name: "5s",
			value: 5000
		},
		{
			name: "10s",
			value: 10000
		},
		{
			name: "15s",
			value: 15000
		}
	];

	let heartRateList = $state<HeartRate[]>([]);
	const currentHeartRate = $derived(heartRateList[heartRateList.length - 1]);
	const avgHeartRates = $derived(
		modes.map((mode) => ({ name: mode.name, heartRate: getAvgHeartRate(mode.value) }))
	);

	//ms동안의 평균 심장박동수
	function getAvgHeartRate(ms: number) {
		//ms동안의 기록
		let lastHeartRate = heartRateList.filter((item) => item.timestamp > Date.now() - ms);
		const sum = lastHeartRate.reduce((acc, item) => acc + item.heartRate, 0);
		return sum / lastHeartRate.length;
	}

	// 매 초마다 심장박동수 정보를 가져옴.
	$effect(() => {
		const interval = setInterval(async () => {
			const res = await fetch("https://advent.sveltesociety.dev/data/2023/day-four.json");
			const data = await res.json();

			heartRateList.push({
				heartRate: data.heartRate,
				timestamp: Date.now()
			});
		}, 1000);

		return () => clearInterval(interval);
	});

</script>

<div>
	<p>Current Heart Rate :  {currentHeartRate?.heartRate ?? "--"}</p>
	<p>Avg Heart Rate</p>
	<ul>
		{#each avgHeartRates as { name, heartRate }}
			<li>{name} : {heartRate}</li>
		{/each}
	</ul>
</div>
