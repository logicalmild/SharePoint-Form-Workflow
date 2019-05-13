function initializePeoplePicker(peoplePickerElementId, Users) {
            if (typeof(Users) == 'undefined') Users = null;
            // Create a schema to store picker properties, and set the properties.
            var schema = {};
            schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
            schema['SearchPrincipalSource'] = 15;
            schema['ResolvePrincipalSource'] = 15;
            schema['AllowMultipleValues'] = false;
            schema['MaximumEntitySuggestions'] = 50;
            schema['Width'] = '280px';
            this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, Users, schema);
        }

        function registerPPOnChangeEvent(ppElement) {
            var ppId = ppElement.attr('id') + "_TopSpan";
            console.log(ppId);

            //var addOnChanged = function(ctx) {
            if (SPClientPeoplePicker &&
                SPClientPeoplePicker.SPClientPeoplePickerDict &&
                SPClientPeoplePicker.SPClientPeoplePickerDict[ppId]) {

                console.log("In registerPPOnChangeEvent if");

                var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[ppId];
                picker.oldChanged = picker.OnControlResolvedUserChanged;

                console.log("picker");
                console.log(picker);
                //OnControlResolvedUserChanged
                picker.OnControlResolvedUserChanged = function () {
                    if (picker.TotalUserCount == 0) {
                        $('#resolvedUsers').html("");
                        $('#userKeys').html("");
                        $('#userProfileProperties').html("");
                        $('#userID').html("");
                    } else {
                        setTimeout(function () {
                                getUserInfo();
                            },
                            100);
                    }
                    picker.oldChanged();
                }
            } else {
                setTimeout(function () { addOnChanged(ctx); }, 100);
                console.log("In registerPPOnChangeEvent else");
            }
            //}
        }
        // Query the picker for user information.
        function getUserInfo() {

            // Get the people picker object from the page.
            
            var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv2_TopSpan;

            // Get information about all users.
            var users = peoplePicker.GetAllUserInfo();
            console.log(users);
            var owner = users[0];
            console.log(owner);
            $("#siteOwenerEmail").val(owner.AutoFillSubDisplayText);
            $("#siteOwenerClaim").val(owner.Key);
            $("#siteOwenerName").val(owner.DisplayText);
            $("#siteOwenerLogin").val(owner.Description);
            var userInfo = '';
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                for (var userProperty in user) {
                    userInfo += userProperty + ':  ' + user[userProperty] + '<br>';
                }
            }
            $('#resolvedUsers').html(userInfo);

            // Get user keys.
            var keys = peoplePicker.GetAllUserKeys();
            $('#userKeys').html(keys);

            // Get the first user's ID by using the login name.
            getUserId(users[0].Key);
        }

        // Get the user ID.
        function getUserId(loginName) {
            var context = new SP.ClientContext.get_current();
            this.user = context.get_web().ensureUser(loginName);
            context.load(this.user);
            context.executeQueryAsync(
                Function.createDelegate(null, ensureUserSuccess),
                Function.createDelegate(null, onFail)
            );
        }

        function ensureUserSuccess() {
            temp_person.id = user.get_id();
            // $('#userId').html(this.user.get_id());
           // $("#siteOwenerId").val(this.user.get_id());
        }

        function onFail(sender, args) {
            alert('Query failed. Error: ' + args.get_message());
        }