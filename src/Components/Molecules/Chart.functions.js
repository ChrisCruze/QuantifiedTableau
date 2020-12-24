//get the max number of the list of numbers so that we can then multiply by a certain number to define the y axis
function number_get_max_multiply(values) {
  const max_number = _.max(values);
  const max_number_upper = max_number * 1.5;
  return max_number_upper;
}

//the below function is the same as chartjs_bar_chart_generate_data_from_labels_values,except that its for a dual axis of a bar and line chart
function chartjs_bar_chart_generate_from_labels_values({ labels, label, values, background_color }) {
  var background_colors = _.map(labels, function(D) {
    return background_color || "#254061";
  });
  var data = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: values,
        backgroundColor: background_colors
      }
    ]
  };
  return data;
}
function format_cell_number_determine_percentage_or_number(num) {
  return num.toFixed(1);
}
function format_bar_chart_label_number(num) {
  var float_num = parseFloat(num) || 0;
  var is_zero = float_num == 0;
  var is_one = float_num == 1;
  var is_greater_one_thousand = float_num > 1000;

  if (is_zero) {
    return "";
  } else if (is_one) {
    return "1";
  } else if (is_greater_one_thousand) {
    return format_cell_number_millions(num);
  } else {
    return format_cell_number_determine_percentage_or_number(num);
  }
}
function cell_number_format(i) {
  return i;
}
//generates basic bar chart with options
function chartjs_barchart_options({ suggestedMax }) {
  var options = {
    legend: {
      display: true
    },
    responsive: true,
    maintainAspectRatio: false,
    barValueSpacing: 20,
    scales: {
      yAxes: [
        {
          suggestedMax: suggestedMax || undefined,
          stacked: true,
          ticks: {
            callback: function(label, index, labels) {
              return cell_number_format(label);
            }
          }
        }
      ]
    },
    hover: {
      animationDuration: 0
    },
    animation: {
      duration: 1,
      onComplete: function() {
        var chartInstance = this.chart,
          ctx = chartInstance.ctx;
        ctx.font = Chart.helpers.fontString(
          Chart.defaults.global.defaultFontSize,
          Chart.defaults.global.defaultFontStyle,
          Chart.defaults.global.defaultFontFamily
        );
        ctx.fontColor = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        this.data.datasets.forEach(function(dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function(bar, index) {
            var data = format_bar_chart_label_number(dataset.data[index]); // format_cell_number_determine_percentage_or_number(dataset.data[index]);
            ctx.fillText(data, bar._model.x, bar._model.y - 5);
          });
        });
      }
    }
  };
  return options;
}

export function chart_attributes_generate({ labels, values, type }) {
  var suggestedMax = number_get_max_multiply(values);
  var options = chartjs_barchart_options({ suggestedMax });
  var data = chartjs_bar_chart_generate_from_labels_values({ labels: labels, values: values, label: "" });
  // var type = ; //horizontalBar
  return { data, options, type: type || "bar" };
}

export function chart_group_by_calculate({ list }) {
  function calculation_func(array) {
    return array_sum_from_key_name(array, "story_points");
  }
  var { keys, values } = array_group_by_calculation(list, "sprint_date", calculation_func);
  return { labels: keys, values };
}

function product_health_velocity_chart_attributes({ labels, values }) {
  var suggestedMax = number_get_max_multiply(values);
  var options = chartjs_barchart_options({ suggestedMax });
  var data = chartjs_bar_chart_generate_from_labels_values({ labels: labels, values: values, label: "" });
  var type = "bar";
  return { data, options, type };
}

function product_health_velocity_labels_values({ jira_data }) {
  function calculation_func(array) {
    return array_sum_from_key_name(array, "story_points");
  }
  var { keys, values } = array_group_by_calculation(jira_data, "sprint_date", calculation_func);
  return { labels: keys, values };
}

function product_health_velocity_chart({ product_attributes }) {
  const jira_data = product_attributes.velocity_last_three_sprints.data;
  // const jira_data = product_attributes.velocity.data
  const { labels, values } = product_health_velocity_labels_values({ jira_data });
  var chart_dict = product_health_velocity_chart_attributes({ labels: labels, values });
  return {
    title: "Velocity",
    id: "velocity",
    chart_dict
  };
}
