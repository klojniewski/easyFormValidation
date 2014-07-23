#easyFormValidation


###Benefits
* You can allow easly add JavaScript / jQuery form validation on your website.
* You have some basic validation rules: required, phone, email, nip (TAX ID).


##Installation

###Step 1: Link plugin file

```html
<script src="/js/jquery.easyFormValidation.js"></script>
```

###Step 2: Add validation classes to your form fields

Validation classes:
* validate - enables validation for this field
* validate-required - field should be filled in
* validate-email - field should contain valid email address
* validate-phone - field should contain valid phone number
* validate-nip - field should contain valid polish tax indetification number

```html
<input type="text" name="userName" class="validate validate-required">
<input type="text" name="userEmail" class="validate validate-required validate-email">
```

###Step 3: Call the easyFormValidation


```javascript
$(document).ready(function(){
  $('.form-contact').easyFormValidation();
});
```



##Configuration options


**messageRequired**
Required field error message.
```
default: 'Pole nie może być puste.'
options: string
```

**messagePhone**
Phone field error message.
```
default: 'Podaj poprawny numer telefonu (np. 2226668888).'
options: string
```

**messageNip**
TAX ID field error message.
```
default: 'Podaj poprawny numer NIP.'
options: string
```

**messageEmail**
Email address field error message.
```
default: 'Podaj poprawny adres e-mail (np. adres@email.pl).'
options: string
```

**messageTemplate**
HTML template for error messages.
```
default: '<div class="{{messageClass}}">{{message}}</div>'
options: string
```

**messageClass**
Error message class name.
```
default: 'error-message'
options: string
```

**validationFailedClass**
Class name of input with fialed validation.
```
default: 'validation-failed'
options: string
```