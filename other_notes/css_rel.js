//css related
1.remove highlight of input when focused?
/*
In your case, try:

input.middle:focus {
    outline-width: 0;
}
Or in general, to affect all basic form elements:

input:focus,
select:focus,
textarea:focus,
button:focus {
    outline: none;
}
In the comments, Noah Whitmore suggested taking this even further to support elements that have the contenteditable attribute set to true (effectively making them a type of input element). The following should target those as well (in CSS3 capable browsers):

[contenteditable="true"]:focus {
    outline: none;
}
Although I wouldn't recommend it, for completeness' sake, you could always disable the focus outline on everything with this:

*:focus {
    outline: none;
}
Keep in mind that the focus outline is an accessibility and usability feature; it clues the user into what element is currently focused.
*/
2.git error: Your local changes to the following files would be overwritten by merge:
wp-content/w3tc-config/master.php
Please, commit your changes or stash them before you can merge.
/*You can't merge with local modifications. Git protects you from losing potentially important changes.

You have three options.

1. Commit the change using

    git commit -m "My message"
2. Stash it.

Stashing acts as a stack, where you can push changes, and you pop them in reverse order.

To stash type:

git stash
Do the merge, and then pull the stash:

git stash pop
3. Discard the local changes

using git reset --hard.
*/
3.disabled style?
select option:disabled {
    color: #000;
    font-weight: bold;
}

4.disable whole div
$("#test *").attr("disabled", "disabled").off('click');

5.git
git config --global user.name "My Name"
git config --global user.email "myemail"
git config --global GitHub.user myusername


6.git reset credential
The git credential cache runs a daemon process which caches your credentials in memory and hands them out on demand. So killing your git-credential-cache--daemon process throws all these away and results in re-prompting you for your password if you continue to use this as the cache.helper option.

You could also disable use of the git credential cache using git config --global --unset credential.helper. Then reset this and you would continue to have the cached credentials available for other repositories (if any). You may also need to do git config --system --unset credential.helper if this has been set in the system config file (eg: Git for Windows 2).

On Windows you might be better off using the manager helper (git config --global credential.helper manager). This stores your credentials in the Windows credential store which has a Control Panel interface where you can delete or edit your stored credentials. With this store, your details are secured by your Windows login and can persist over multiple sessions. The manager helper included in Got for Windows 2.x has replaced the earlier wincred helper that was added in Git for Windows 1.8.1.1. A similar helper called winstore is also available online and was used with GitExtensions as it offers a more GUI driven interface. The manager helper offers the same GUI interface as winstore.

Extract from Windows manual detailing the Windows credential store panel:

Open User Accounts by clicking the Start button Picture of the Start button, clicking Control Panel, clicking User Accounts and Family Safety (or clicking User Accounts, if you are connected to a network domain), and then clicking User Accounts. In the left pane, click Manage your credentials.