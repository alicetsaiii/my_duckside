import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeSeriesScale,
    Filler,
} from 'chart.js';
import { Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
import { Search, BarChartSteps, ZoomIn, ZoomOut, ChevronRight, ChevronLeft, ChevronDoubleRight, ChevronDoubleLeft } from 'react-bootstrap-icons';
import dt from 'date-and-time';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState, useRef } from 'react';
import 'chartjs-adapter-date-fns';
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TimeSeriesScale,
    Title,
    Tooltip,
    Legend,
    Filler
);

// 技術圖設定
const initialOptions = {
    scales: {
        x: {
            type: 'timeseries',
            display: 'auto',
            ticks: {
                source: "labels",
                callback: (v, i, arr) => {
                    if (i === 0) {
                        return v;
                    } else {
                        let currentYmdArr = v.split('/');
                        return `${currentYmdArr[1]}/${currentYmdArr[2]}`
                        //     let currentDate = new Date(arr[i].value);
                        //     let previousDate = new Date(arr[i-1].value);
                        //     return currentDate.getFullYear() !== previousDate.getFullYear() ? v:
                        //     Math.floor(currentDate.getDate()/10) !== Math.floor(previousDate.getDate()/10) ? `${currentYmdArr[1]}/${currentYmdArr[2]}`:"";
                    }
                }
            },
            time: {
                unit: 'day',
                // round: 'true',
                displayFormats: {
                    day: "yyyy/M/d",
                },
                // minUnit:'day'
            },
            // bound:'ticks',
        },
        y: {
            title: {
                display: true,
                text: '元',
            },
            stack: 1,
            stackWeight: 3,
            position: 'right',
            beginAtZero: false,
            offset: true,
        },
        y2: {
            title: {
                display: true,
                text: '張數',
            },
            stacked: true,
            stack: 1,
            stackWeight: 1,
            position: 'right',
            min: true,
            ticks: {
                callback: val => Math.floor(val / 1000),
            },
        }
    },
    interaction: {
        intersect: false,
        mode: 'index',
    },
    // maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            callbacks: {
                title: (i) => {
                    let tempIdx = i[0].label.lastIndexOf(',')
                    return i[0].label.slice(0, tempIdx);
                },
                label: (i) => {
                    return [i.dataset.label, i.raw];
                }
            }
        }
    }
};
const body_red = 'rgba(255, 144, 144)';
const body_green = 'rgba(144, 255, 144)';
const body_gray = 'rgba(96, 96, 96)';
const shadow_red = 'rgba(255, 196, 196)';
const shadow_green = 'rgba(196, 255, 196)';
const shadow_gray = 'rgba(144, 144, 144)';

const urlGetDatalist = 'http://localhost:5000/securities/datalist/';
const urlpostCandle = 'http://localhost:5000/securities/candlestick';

let controller = new AbortController();
const getDatalist = (inputStr, callback) => {
    if (inputStr.length < 2 || inputStr.length > 6) {
        return
    } else {
        controller.abort();
        controller = new AbortController();
        axios(urlGetDatalist + inputStr, { signal: controller.signal }).then((result) => {
            let datalist = result.data.map((v) => {
                return `${v['sec_id']} ${v['sec_name']}`
            });
            callback(datalist);
        })
    }
}
const getBodyColor = function (ayy) {
    return ayy.map(e => {
        switch (e) {
            case 1:
                return body_red;
            case -1:
                return body_green;
            case 0:
                return body_gray;
            default:
                return body_gray;
        }
    })
};
const getShadowColor = function (ayy) {
    return ayy.map(e => {
        switch (e) {
            case 1:
                return shadow_red;
            case -1:
                return shadow_green;
            case 0:
                return shadow_gray;
            default:
                return shadow_gray;
        }
    })
};

export function MyCandleLookup(props) {
    const [datalist, setDatalist] = useState([]);
    const inputSecStr = useRef();
    const [validated, setValidated] = useState(false);

    const [dataCandle, setDataCandle] = useState(false);
    // const [minDateIdx, setMinDateIdx] = useState(0);
    // const [maxDateIdx, setMaxDateIdx] = useState(0);
    const [options, setOptions] = useState(initialOptions);
    const [showCandle, setShowCandle] = useState(false);

    const lookupCandle = () => {
        let dateEnd = new Date();
        let dateStart = dt.addYears(dateEnd, -5);
        let dataToServer = {
            stockId: inputSecStr.current.value.split(' ')[0],
            period1: dt.format(dateStart, 'YYYYMMDD'),
            period2: dt.format(dateEnd, 'YYYYMMDD'),
        }
        axios.post(urlpostCandle, dataToServer).then((res) => {
            console.log(res.data);
            setDataCandle(res.data);
            let len = res.data.dates.length;
            let newOptions = { ...options };
            newOptions.scales.x.min = res.data.dates[len - 20];
            newOptions.scales.x.max = res.data.dates[len - 1];
            console.log(newOptions);
            setOptions(newOptions);
            setShowCandle(true);
        })
    };
    function dataRangeMove(d = 1) {
        let newOptions = { ...options };
        let minDateIdx = dataCandle.dates.indexOf(newOptions.scales.x.min);
        let maxDateIdx = dataCandle.dates.indexOf(newOptions.scales.x.max);

        console.log(minDateIdx);
        console.log(maxDateIdx);

        let i = 0;
        if (d > 0) {
            while (dataCandle.dates[maxDateIdx + i + 1] && i < Math.abs(d)) {
                i += 1;
            };
            newOptions.scales.x.min = dataCandle.dates[minDateIdx + i];
            newOptions.scales.x.max = dataCandle.dates[maxDateIdx + i];
            console.log(`${minDateIdx + i}-${maxDateIdx + i}`);
        } else {
            while (dataCandle.dates[minDateIdx - i - 1] && i < Math.abs(d)) {
                i += 1;
            };
            newOptions.scales.x.min = dataCandle.dates[minDateIdx - i];
            newOptions.scales.x.max = dataCandle.dates[maxDateIdx - i];
            console.log(`${minDateIdx - i}-${maxDateIdx - i}`);
        }
        setOptions(newOptions);
    }
    function dataRangeZoomOut(d = 1) {
        let newOptions = { ...options };
        let minDateIdx = dataCandle.dates.indexOf(newOptions.scales.x.min);
        let maxDateIdx = dataCandle.dates.indexOf(newOptions.scales.x.max);
        console.log(`${minDateIdx}-${maxDateIdx}`);

        for (let pedo = 0, i = 0; pedo < d; pedo++) {
            if (dataCandle.dates[maxDateIdx + 1] && i++ < d / 2) {
                maxDateIdx += 1;
                continue;
            } else if (dataCandle.dates[minDateIdx - 1]) {
                minDateIdx -= 1;
                continue;
            } else if (dataCandle.dates[maxDateIdx + 1]) {
                maxDateIdx += 1;
                continue;
            } else {
                pedo = 9999;
            }
        }
        newOptions.scales.x.min = dataCandle.dates[minDateIdx];
        newOptions.scales.x.max = dataCandle.dates[maxDateIdx];
        console.log(`${minDateIdx}-${maxDateIdx}`);
        setOptions(newOptions);
    }
    function dataRangeZoomIn(d = 1) {
        let newOptions = { ...options };

        let minDateIdx = dataCandle.dates.indexOf(newOptions.scales.x.min);
        let maxDateIdx = dataCandle.dates.indexOf(newOptions.scales.x.max);
        console.log(`${minDateIdx}-${maxDateIdx}`);

        for (let pedo = 0; pedo < d && maxDateIdx - minDateIdx >= 10; pedo++) {
            if (pedo % 2 === 0) {
                maxDateIdx -= 1;
                console.log('maxDateIdx-1');
                continue;
            } else {
                minDateIdx += 1;
                console.log('minDateIdx+1');
                continue;
            }
        }

        newOptions.scales.x.min = dataCandle.dates[minDateIdx];
        newOptions.scales.x.max = dataCandle.dates[maxDateIdx];
        console.log(`${minDateIdx}-${maxDateIdx}`);
        setOptions(newOptions);
    }
    return (
        <>
            <Form inline noValidate className='mt-2 d-inline' validated={validated}>
                <Form.Label htmlFor="inlineFormInputName2" srOnly>
                    K線速查
                </Form.Label>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                            <BarChartSteps style={{ transform: 'rotate(-90deg)' }} />
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        id="sec_str" name="sec_str" ref={inputSecStr}
                        placeholder='查詢技術線圖'
                        onChange={({ target }) => getDatalist(target.value, setDatalist)}
                        list='lookupCandle'
                    />
                    <InputGroup.Append>
                        <Button
                            size="sm" variant="warning"
                            onClick={lookupCandle}>
                            <Search />
                        </Button>
                    </InputGroup.Append>
                    <FormControl.Feedback></FormControl.Feedback>

                    <datalist id='lookupCandle'>
                        {datalist.map((v, i) =>
                            <option key={i} value={v} />
                        )}
                    </datalist>
                </InputGroup>

            </Form>
            <Modal show={showCandle} onHide={() => { setShowCandle(false) }} centered={true} size='lg'>
                <Modal.Header closeButton className='pl-4'>
                    <Modal.Title>
                        {inputSecStr.current && inputSecStr.current.value}
                    </Modal.Title>
                    <Button variant='light'>
                        <ZoomOut onClick={() => dataRangeZoomOut(20)} />
                    </Button>
                    <Button variant='light'>
                        <ZoomIn onClick={() => dataRangeZoomIn(20)} />
                    </Button>
                </Modal.Header>
                <div style={{ position: 'relative', width: '95%' }} className='pl-2'>
                    {dataCandle &&
                        <Bar options={options}
                            data={{
                                labels: dataCandle.dates,
                                datasets: [
                                    {
                                        label: "最低, 最高",
                                        data: dataCandle.candleShadow,
                                        backgroundColor: getShadowColor(dataCandle.priceDaytimeMoveDir),
                                        barPercentage: 0.2,
                                        // barThickness: 20,
                                        grouped: false,
                                        order: 3,
                                    },
                                    {
                                        label: "開盤, 收盤",
                                        data: dataCandle.candleBody,
                                        backgroundColor: getBodyColor(dataCandle.priceDaytimeMoveDir),
                                        barPercentage: 0.9,
                                        // barThickness: 20,
                                        grouped: false,
                                        order: 1,
                                        minBarLength: 1,
                                    },
                                    {
                                        label: "成交量(股)",
                                        data: dataCandle.volShare,
                                        backgroundColor: getShadowColor(dataCandle.priceCloseChangeDir),
                                        borderColor: getBodyColor(dataCandle.priceCloseChangeDir),
                                        borderWidth: 2,
                                        barPercentage: 1,
                                        yAxisID: 'y2',
                                    }
                                ]
                            }}
                        />
                    }
                </div>
                <div className='d-flex justify-content-center'>
                    <Button variant='light' className="mr-2 ml-2" onClick={() => dataRangeMove(-10)}>
                        <ChevronDoubleLeft />
                    </Button>
                    <Button variant='light' className="mr-2 ml-2" onClick={() => dataRangeMove(-5)}>
                        <ChevronLeft />
                    </Button>
                    <Button variant='light' className="mr-2 ml-2" onClick={() => dataRangeMove(5)}>
                        <ChevronRight />
                    </Button>
                    <Button variant='light' className="mr-2 ml-2" onClick={() => dataRangeMove(10)}>
                        <ChevronDoubleRight />
                    </Button>
                </div>
            </Modal>
        </>
    )
}