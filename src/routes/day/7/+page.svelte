<script lang="ts">
    import { Button } from "$ui/button";
    import { Input } from "$ui/input";
    import {Label} from "$ui/label";
    import {morseMap} from "./morseMap";

    let inputVal = $state("hello World");
    let morseCode :string[] = $derived(convertToMorse());
    
    function convertToMorse(){
        const inputArr = inputVal.toUpperCase().split("");
        const morseArr : string[] = [];
        
        inputArr.forEach((char)=>{
            const morseChar = morseMap.get(char);
            if(morseChar){
                morseArr.push(morseChar);
            }
        });

        return morseArr;
    }

    // audio
    let context : AudioContext;
    let gain: GainNode;
    let oscillator: OscillatorNode;
    let stopped = false;
    let started = $state(false);

    $effect(()=>{
        context = new AudioContext();
    })

    function sleep(ms: number){
        return new Promise(resolve => setTimeout(resolve,ms));
    }

    function stop(){
        stopped = true;
		gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.04);
    }

    async function beep(ms: number) {
		gain = context.createGain();
		oscillator = context.createOscillator();
		oscillator.connect(gain);
		gain.connect(context.destination);
		oscillator.start(0);
		await sleep(ms);
		gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.04);
		await sleep(300);
	}

    async function playMorse(){
        started = true;
        for (const item of morseCode.join(" ")){
            if(stopped){
                started = false;
                stopped = false;
                break;
            }
            if(item === "."){
                await beep(400);
            }else if(item === "-"){
                await beep(800);
            }else if(item === " "){
                await sleep(600);
            }
        }
    }


</script>
<div class="flex-col space-y-2">
    <Input type="text" bind:value={inputVal} placeholder="what you want to convert to morse-code"/>

    <Label class="block text-lg">
        morse-code {morseCode.join(" ")}
    </Label>

    <Button disabled={started} onclick={async () => await playMorse()}>Start</Button>
    <Button onclick={stop} disabled={!started}>Stop</Button>
</div>
