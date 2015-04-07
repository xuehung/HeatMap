/*
 * Author: Hsueh-Hung Cheng (xuehung@gmail.com)
 * This file use react.js to generate the table. It will be
 * updated whenever the display.update() is invoked
 */

var DataList = React.createClass({
  render: function() {
    var dataNodes = this.props.data.map(function (entry) {
          return (
                  <DataEntry data={entry}>
                  </DataEntry>
                );
        });
      return (
          <div>
          <h2>{dataNodes.length}&#47;{rawData.length} Records</h2>
          <table className="dataList table table-hover table-striped">
          <th>Lat</th>
          <th>Lng</th>
          <th>Total Savings Potential</th>
          <tbody>
            {dataNodes}
            </tbody>
          </table>
          </div>
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
    update: function(data) {
        React.render(
            <DataList data={data} />,
            document.getElementById('dataTable')
        );
    },
};

display.update(rawData);

