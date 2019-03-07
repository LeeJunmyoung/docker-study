define(['settings'],
function (Settings) {
  "use strict";

  return new Settings({
    datasources: {
      graphite: {
        type: 'graphite',
        url: "http://ip",
      },
      elasticsearch: {
        type: 'elasticsearch',
        url: "http://ip:9200",
        index: 'grafana-dash',
        grafanaDB: true,
      }
    },
    search: {
      max_results: 20
    },
    default_route: '/dashboard/file/default.json',
    unsaved_changes_warning: true,
    playlist_timespan: "1m",
    admin: {
      password: ''
    },
    plugins: {
      panels: []
    }
  });
});
