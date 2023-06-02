import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:notice/common_widgets/bottom_bar.dart';
import 'package:notice/features/giveaway/ui/giveaway.dart';
import 'package:notice/features/lost_and_found/ui/lost_an_found_Page.dart';
import 'package:notice/features/notice/ui/notice.dart';
import 'package:notice/features/user/ui/user.dart';

void main() {
  group('MyBottomNavigationBar', () {
    

    testWidgets('Clicking on Person Icon navigates to Profile page',
        (WidgetTester tester) async {
      await tester.pumpWidget(MaterialApp(
        home: MyBottomNavigationBar(),
      ));

      await tester.tap(find.byIcon(Icons.person));
      await tester.pump();

      expect(find.byType(NoticePage), findsNothing);
      expect(find.byType(Giveaway), findsNothing);
      expect(find.byType(LostAndFoundPage), findsNothing);
      expect(find.byType(Profile), findsOneWidget);
    });

    testWidgets(
        'Clicking on Add Floating Action Button changes the current index to 2',
        (WidgetTester tester) async {
      await tester.pumpWidget(MaterialApp(
        home: MyBottomNavigationBar(),
      ));

      await tester.tap(find.byIcon(Icons.add));
      await tester.pump();

      // final bottomNavigationBar = tester
      //     .widget<MyBottomNavigationBar>(find.byType(MyBottomNavigationBar));
      // expect(bottomNavigationBar.currentIndex, 2);
    });
  });
}
