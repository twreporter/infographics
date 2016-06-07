#!/usr/bin/perl

use strict;
use DateTime;
use Data::Dumper;

open(my $fh, "<", "earthquake.csv") or die "can not open the file";
my $current;
while (<$fh>) {
    if (m/(\d{4})\/(\d{2})\/(\d{2}) (\d{2}):(\d{2})/) {
        my $dt = DateTime->new(
            year => $1,
            month => $2,
            day => $3,
            hour => $4,
            minute => $5,
            time_zone  => 'Asia/Taipei',
        );
        if ($current) {
            my $duration = $current->subtract_datetime($dt);
            my @dur = $duration->in_units('days', 'minutes');
            print "$1/$2/$3 $4:$5 - ".$dur[0].".".$dur[1]."\n";
        }
        $current = $dt;
    }
}

