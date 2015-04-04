var DataList = React.createClass({
  render: function() {
    var dataNodes = this.props.data.map(function (entry) {
          return (
                  <DataEntry data={entry}>
                  </DataEntry>
                );
        });
      return (
          <table className="dataList table table-hover table-striped">
          <th>Lat</th>
          <th>Lng</th>
          <th>Total Savings Potential</th>
            {dataNodes}
          </table>
        );
    }
});


var DataEntry = React.createClass({
  render: function() {
      return (
            <tr className="dataEntry">
                <td> {this.props.data.lat} </td>
                <td> {this.props.data.lng} </td>
                <td> &#36;{this.props.data.count} </td>
            </tr>
          );
    }
});

var display = {
    update: function() {
        React.render(
            <DataList data={heatData.data}/>,
            document.getElementById('dataTable')
        );
    },
};


display.update();
