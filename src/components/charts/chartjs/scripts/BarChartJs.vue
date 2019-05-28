<script>
import { Bar } from 'vue-chartjs'

export default {
  name: 'bar-chart-js',
  extends: Bar,
  props: {
    statusError: Number,
    statusFinished: Number,
    statusProcessing: Number,
    statusEnqueued: Number
  },
  data: function () {
    return {

    }
  },
  mounted () {
    // Overwriting base render method with actual data.
    console.log(this.statusError)
    this.renderChart(
      {
        labels: [
          'Message Statuses'
        ],
        datasets: [
          {
            label: 'Processing',
            data: [this.statusProcessing],
            borderWidth: '0',
            backgroundColor: '#007bff'
          },
          {
            label: 'Finished',
            data: [this.statusFinished],
            borderWidth: '0',
            backgroundColor: '#28a745'
          },
          {
            label: 'Enqueued',
            data: [this.statusEnqueued],
            borderWidth: '0',
            backgroundColor: '#17a2b8'
          },
          {
            label: 'Error',
            data: [this.statusError],
            borderWidth: '0',
            backgroundColor: '#dc3545'
          }
        ]
      },
      {
        maintainAspectRatio: false,
        legend: {
          display: true
        },
        scales: {
          xAxes: [
            {
              display: true,
              categoryPercentage: 1,
              barPercentage: 0.5
            }
          ],
          yAxes: [
            {
              display: true
            }
          ]
        }
      }
    )
  }
}
</script>
