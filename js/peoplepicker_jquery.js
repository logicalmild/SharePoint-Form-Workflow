// using jQuery
var MyPeoplePicker = function() {
  this.ready = false;
  this.pickerID = "";
  this.users = [];
  /**
   * Render and initialize the client-side People Picker.
   * @param  {String} peoplePickerElementId The `id` from the <div>
   * @param  {Object} [options]
   *   @param {String} [options.PrincipalAccountType='User,DL,SecGroup,SPGroup']
   *   @param {Number} [options.SearchPrincipalSource=15]
   *   @param {Number} [options.ResolvePrincipalSource=15]
   *   @param {Boolean} [options.AllowMultipleValues=true]
   *   @param {Number} [options.MaximumEntitySuggestions=50]
   *   @param {String} [options.Width='280px']
   * @param {Function} [callback] To do an action after the loading
   */
  this.init=function(peoplePickerElementId, options, callback) {
    // Create a schema to store picker properties, and set the properties.
    var schema = {}, _this=this;
    _this.pickerID = peoplePickerElementId;
    if (typeof options === "function") {
      callback=options;
      options={};
    }
    callback = callback || function(){};

    // the options
    schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
    schema['SearchPrincipalSource'] = 15;
    schema['ResolvePrincipalSource'] = 15;
    schema['AllowMultipleValues'] = true;
    schema['MaximumEntitySuggestions'] = 50;
    schema['Width'] = '220px';
    schema = jQuery.extend({}, schema, options);

    // Render and initialize the picker. 
    // Pass the ID of the DOM element that contains the picker, an array of initial
    // PickerEntity objects to set the picker value, and a schema that defines
    // picker properties.
    // and do it only when all is ready
    $.each(['sp.core.js', 'sp.runtime.js', 'sp.js', 'autofill.js', 'clientpeoplepicker.js', 'clientforms.js', 'clienttemplates.js'], function(idx, val) {
        if (!_v_dictSod[val]) RegisterSod(val, "\u002f_layouts\u002f15\u002f"+val);
      }
    );
    SP.SOD.loadMultiple(['sp.core.js', 'sp.runtime.js', 'sp.js', 'autofill.js', 'clientpeoplepicker.js', 'clientforms.js', 'clienttemplates.js'], function() {
      SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
      _this.ready=true;
      // monitor this field to do something when the value change
      _this._monitor();
      callback.call(_this)
    });
  };
  // Query the picker for user information.
  /**
   * Return an array of users' info
   * @return {[type]} [description]
   */
  this.getUsers=function() {
    var _this=this;
    if (_this.ready === false)  {
      alert("[ERROR] Please init the object first")
      return
    }
    // Get the people picker object from the page.
    var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[_this.pickerID+"_TopSpan"];

    // Get information about all users.
    _this.users = peoplePicker.GetAllUserInfo();
    return _this.users;
    // Get user keys.
    //var keys = peoplePicker.GetAllUserKeys();
  };
  /**
   * Get the user ID for the selected users
   * @param  {Function} callback With a parameter that is an array of IDs
   */
  this.getUsersID=function(callback) {
    var context = new SP.ClientContext.get_current();
    var _this=this;
    if (_this.ready === false)  {
      alert("[ERROR] Please init the object first")
      return
    }
    callback = callback || function(){};
    var users=_this.getUsers();

    // for each users we create a deferred object
    if (jQuery.type(users) !== "array") users = [ users ];
    var fctDeferred = jQuery.map(users, function(u) {
      var deferred=jQuery.Deferred();
      var user = context.get_web().ensureUser(u.Key);
      context.load(user);
      context.executeQueryAsync(
        (function() { deferred.resolve(user.get_id()) }),
        (function(sender, args) { deferred.reject('Query failed. Error: ' + args.get_message()) })
      );
      return deferred;
    });

    $.when.apply(_this,fctDeferred).done(function() {
      callback.apply(_this,arguments)
    }).fail(function(error) {
      alert(error)
    })
  };
  /**
   * This function will monitor the field and if something changed then it will send the event "user:changed"
   */
  this._monitor=function() {
    var _this=this;
    _this.monitorID = _this.pickerID+"_TopSpan_HiddenInput";
    _this.monitorValue=document.getElementById(_this.monitorID).value;
    _this.monitorInterval = setInterval(function() {
      var el = document.getElementById(_this.monitorID);
      if (!el) clearInterval(_this.monitorInterval);
      else {
        if (_this.monitorValue !== el.value) {
          $('#'+_this.pickerID).trigger("user:changed");
        }
        _this.monitorValue = el.value;
      }
    }, 200);
  },
  /**
   * It will set some users into the PeoplePicker
   * @param {String|Array} users Must be a key value (e.g. "i:0#.w|europe\aymeric_de_martin")
   */
  this.setUsers=function(users) {
    if (jQuery.type(users) === "array") users=users.join(";");
    var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[this.pickerID+"_TopSpan"];
    var e = document.getElementById(peoplePicker.ResolvedListElementId);
    if (e) {
      e = e.querySelectorAll('span');
      var id = e.length;
      // remove existing values from the peoplePicker
      while(id--) { peoplePicker.DeleteProcessedUser(); }
    }
    peoplePicker.AddUserKeys(users, false)
  }
};