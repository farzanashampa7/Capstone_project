import React from 'react';
import ReactECharts from 'echarts-for-react';

export default function PieChart(props) {
    const { data } = props;
    const options = {
        title: {
            text: 'Budget chart',
            subtext: 'Find your information',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
        },
        series: [
            {
                name: 'Budget chart',
                type: 'pie',
                radius: '50%',
                data: data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    return (
        <ReactECharts
            option={options}
            notMerge={true}
            lazyUpdate={true}
        />
    )
}