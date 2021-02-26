'use strict';

const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;
const Lang = imports.lang;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

function init() {
}

function buildPrefsWidget() {

    let gschema = Gio.SettingsSchemaSource.new_from_directory(
        Me.dir.get_child('schemas').get_path(),
        Gio.SettingsSchemaSource.get_default(),
        false
    );

    let settings = new Gio.Settings({
        settings_schema: gschema.lookup('org.gnome.shell.extensions.spotifyadblocker', true)
    });

    let prefsWidget = new Gtk.Grid({
        margin: 18,
        column_spacing: 12,
        row_spacing: 12,
        visible: true,
        column_homogeneous: true,
    });

    let index = 0;

    let title = new Gtk.Label({
        label: '<b>' + Me.metadata.name + ' Extension Preferences</b>',
        halign: Gtk.Align.START,
        use_markup: true,
        visible: true
    });
    prefsWidget.attach(title, 0, index, 1, 1);

    /* mute-ads state */
    let muteAdLabel = new Gtk.Label({
        label: 'Mute ads:',
        halign: Gtk.Align.START,
        visible: true
    });

    let muteAdSwitch = new Gtk.Switch({
    	valign: Gtk.Align.END,
    	halign: Gtk.Align.END,
    	visible: true
    });

    index++;
    prefsWidget.attach(muteAdLabel, 0, index, 1, 1);
    prefsWidget.attach(muteAdSwitch, 1, index, 1, 1);

    /* hide-icon */
    let hideIconLabel = new Gtk.Label({
        label: 'Hide icon:',
        halign: Gtk.Align.START,
        visible: true
    });

    let hideIconSwitch = new Gtk.Switch({
    	valign: Gtk.Align.END,
    	halign: Gtk.Align.END,
    	visible: true
    });

    index++;
    prefsWidget.attach(hideIconLabel, 0, index, 1, 1);
    prefsWidget.attach(hideIconSwitch, 1, index, 1, 1);

    settings.bind('mute-ads', muteAdSwitch, 'active', Gio.SettingsBindFlags.DEFAULT);
    settings.bind('hide-icon', hideIconSwitch, 'active', Gio.SettingsBindFlags.DEFAULT);

    return prefsWidget;
}
