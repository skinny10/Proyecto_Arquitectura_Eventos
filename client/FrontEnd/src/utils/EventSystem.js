const EventSystem = {
    events: {},
  
    subscribe: function(eventName, callback) {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(callback);
    },
  
    unsubscribe: function(eventName, callback) {
      if (this.events[eventName]) {
        this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
      }
    },
  
    emit: function(eventName, data) {
      if (this.events[eventName]) {
        this.events[eventName].forEach(callback => {
          callback(data);
        });
      }
    }
  };
  
  export default EventSystem;
  