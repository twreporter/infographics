#!/usr/bin/perl

use strict;
open(my $fh, "<", "earthquake.csv") or die "can not open the file";
my %year;
while (<$fh>) {
    if (m/(\d{4})\/(\d{2})\/\d{2}/) {
        if (exists $year{$1.$2}) {
            $year{$1.$2}++;
        } else {
            $year{$1.$2} = 1;
        }
    }
}

for (sort keys(%year)) {
    print "$_\, $year{$_}\n";
}
